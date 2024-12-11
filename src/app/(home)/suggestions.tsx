import React from 'react'

interface SuggestionsProps {
    suggestions: {
        relevance: number;
        serpapi_api: string;
        type: string
        value: string;
    }[];
    chatResponse: string;
}

export const Suggestions = ( {suggestions, chatResponse}: SuggestionsProps) => {

  

  return (


    <div className='absolute top-[130%] h-[300px] overflow-hidden w-full  rounded-b-lg'>


  <button type="button" className="transtion backdrop-blur-2xl group flex w-full h-[100px] items-center justify-center rounded-md bg-gradient-to-r from-purple-500 via-red-500 to-orange-500 p-[1.8px] text-white duration-300  hover:shadow-purple-600/30">
            
  <div className="flex flex-col items-start  h-full w-full justify-center rounded-md  bg-gradient-to-br from-gray-700 to-black/80 transition duration-300 ease-in-out text-left p-2">
  <p className='line-clamp-3 text-white/80 text-[13px]'>{chatResponse}
    
  </p>
  <span className='text-gray-300/50 text-[13px]'>More on wikipedia.org</span>
  </div>
            
        </button>

        <div className='flex flex-col items-start gap-y-3 p-3 pb-0 mt-2 bg-navbar w-full rounded-lg'>
        <h2 className='text-gray-300/50 text-[15px] font-semibold'>Suggestions</h2>
        
        {suggestions?.map((suggestion, index) => (
            <button key={index} className='text-gray-300/50 text-[16px]'>
                {suggestion.value.split(' ')[0]} <span className='font-semibold'>
                    {suggestion.value.split(' ').slice(1).join(' ')}
                </span>
            </button>
        ))}
        </div>
      

    </div>
  )
}
