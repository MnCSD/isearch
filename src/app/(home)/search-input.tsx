"use client";

import { getJson } from "serpapi";
import { IoIosSearch } from "react-icons/io";
import React, { useEffect, useRef, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";
import { Suggestions } from "./suggestions";
import { getChatCompletion } from "@/lib/groq";



 type SuggestionsType =  [
   {
      relevance: number;
      serpapi_api: string;
      type: string
      value: string;
   }
 ]


export const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [chatResponse, setChatResponse] = useState("");
  const [suggestions, setSuggestions] = useState<SuggestionsType>();

  useEffect(() => {
    ref.current?.focus();
  }, []);

 

  const getSuggestions = async (term: string) => {
    if (!term) {
    
      return;
    }

    setIsPending(true);

    try {
      
      const response = await fetch(`/api/suggestions?q=${encodeURIComponent(term)}`);
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const suggestions = await response.json();
      setSuggestions(suggestions);
      const chatResponse = await getChatCompletion(term).then((response) => 
      {
        setChatResponse(response);
      }
      ).finally(() => {
        setIsPending(false);
      });

      
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const debouncedUpdate = useDebounce((newValue: string) => {
    getSuggestions(newValue);
  });
  
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);

    debouncedUpdate(newValue);
  };

 

  return (
    <div
      ref={ref}
      className=" bg-[#4C4A4C] relative h-[30px] w-[90%] lg:max-w-[600px] rounded-[8px]"
    >
      {value && !isPending && <Suggestions chatResponse={chatResponse} suggestions={suggestions as SuggestionsType}/>}
      

      <form className="w-full h-full">
        <input
        onChange={onChange}
          className="w-full h-full pl-8 bg-transparent rounded-[8px] outline-none focus:border-[3px] border-[#38719D] text-white text-[14px] placeholder-[#B9B7B9] placeholder-opacity-50 px-2"
          placeholder="Search or enter website name"
          autoFocus
        />
        <IoIosSearch
          className="absolute top-1/2 left-2 transform -translate-y-1/2 size-5 "
          color="gray"
          strokeWidth={3}
        />
      </form>
    </div>
  );
};
