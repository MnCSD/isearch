"use client";

import { Label } from "@/components/ui/label";
import { Navbar } from "./navbar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PiSlidersThin } from "react-icons/pi";
import { Input } from "@/components/ui/input";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useRef, useState } from "react";
import { Loader2Icon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import { Authenticated, Unauthenticated } from "convex/react";
import { AuthenticationForm } from "./authentication-form";
import { Widgets } from "./widgets";
import { useCreatePreference } from "@/features/preferences/use-create-preferences";
import { useGetPreferences } from "@/features/preferences/use-get-preferences";

export default function Home() {
  
  const fileRef = useRef<HTMLInputElement>(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const {mutate} = useCreatePreference()
  const {data, isLoading} = useGetPreferences()
  const [imgValue, setImageValue] = useState(data?.[0]?.backgroundImage);

  useEffect(() => {
    if (data) {
      setImageValue(data[0]?.backgroundImage);
    }
  }, [data])



  const handleUploadFile = () => {
    fileRef.current?.click();

    fileRef.current?.addEventListener("change", (e) => {
      const files = (e.target as HTMLInputElement).files;
      if (!files) return;
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setImageValue(e.target.result);
          setImageUploaded(true);
        }
      };

      reader.readAsDataURL(file);
    });
  };


  if(isLoading) {
    return <div className="w-full h-screen bg-main_background flex items-center justify-center">
      <LoaderIcon className="size-10 animate-spin text-gray-400"/>
    </div>
  }


  return (
    <main className="bg-main_background relative h-screen w-full">



      <Navbar />

      <div
        style={{
          backgroundImage: imgValue && `url(${imgValue})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        className="absolute top-0 h-full flex w-full bg-main_background justify-center pt-[100px]"
      >
        <Unauthenticated>
          <AuthenticationForm />
        </Unauthenticated>
        <Authenticated>
          <Widgets/>
        </Authenticated>
       
      </div>

      <Popover>
        <PopoverTrigger asChild>
          <button
            onClick={() => {}}
            color="#ffffff"
            className="size-8 cursor-pointer text-black bg-white text-xs w-[60px] rounded-md absolute bottom-3 right-3 h-[20px]"
            
          >Edit</button>
        </PopoverTrigger>
        <PopoverContent className="w-80 mr-4 mb-2 pl-14 bg-navbar border-none shadow-md">
          <div className="mb-2">
            <Label className="text-white font-semibold">Change wallpaper</Label>
          </div>
          <Carousel className="w-[80%]">
            <CarouselContent className="">
              <CarouselItem
                className="basis-2/4 cursor-pointer"
                onClick={handleUploadFile}
              >
                {!imageUploaded ? (
                  <div className="w-full h-full bg-[#B9B7B9] flex items-center justify-center rounded-sm">
                    <PlusIcon className="size-5s" />
                  </div>
                ) : (
                  <div
                    className="relative"
                    onClick={() => {
                      setImageUploaded(false);
                      setImageValue("");
                    }}
                  >
                    <img
                      src={imgValue}
                      alt=""
                      className="w-full h-[50px] object-cover border-sky-900 border-[3px] rounded-sm"
                    />
                    <XIcon
                      className="size-3 bg-black/80 rounded-full cursor-pointer absolute top-0 -left-0 z-[999]"
                      color="white"
                      strokeWidth={2}
                    />
                  </div>
                )}

                <input type="file" ref={fileRef} hidden />
              </CarouselItem>
              <CarouselItem
                className="basis-2/4 cursor-pointer"
                onClick={(e) => {
                  // @ts-expect-error image
                  setImageValue(e.target.attributes.src.nodeValue);
                  mutate({
                    // @ts-expect-error image
                    image: e.target.attributes.src.nodeValue
                  }).then(() => {
                    
                  }).catch(() => {
                    
                  })
                }}
              >
                <img
                  src="https://dynamicwallpaper.club/landing-vids/1.png"
                  alt=""
                  className="w-full h-[50px] border-[#B9B7B9] border rounded-sm"
                />
              </CarouselItem>
              <CarouselItem
                onClick={(e) => {
                  // @ts-expect-error image
                  setImageValue(e.target.attributes.src.nodeValue);
                  mutate({
                    // @ts-expect-error image
                    image: e.target.attributes.src.nodeValue
                  }).then(() => {
                    
                  }).catch(() => {
                    
                  })
                }}
                className="basis-2/4 cursor-pointer"
              >
                <img
                  src="https://media.idownloadblog.com/wp-content/uploads/2021/08/Safari-Wallpaper-AR72014-iDownloadBlog-iPad-Desktop-Orange.jpeg"
                  alt=""
                  className="w-full h-[50px] border-[#B9B7B9] border rounded-sm"
                />
              </CarouselItem>
              <CarouselItem
                className="basis-2/4 cursor-pointer"
                onClick={(e) => {
                  // @ts-expect-error image
                  setImageValue(e.target.attributes.src.nodeValue);
                  mutate({
                    // @ts-expect-error image
                    image: e.target.attributes.src.nodeValue
                  }).then(() => {
                    
                  }).catch(() => {
                    
                  })
                }}
              >
                <img
                  src="https://demos.transloadit.com/37/2563d414ca45639b9113d903168a23/forest.jpg"
                  alt=""
                  className="w-full h-[50px] border-[#B9B7B9] border rounded-sm"
                />
              </CarouselItem>
            </CarouselContent>
            <CarouselPrevious className="size-4" />
            <CarouselNext className="size-4" />
          </Carousel>
        </PopoverContent>
      </Popover>
    </main>
  );
}
