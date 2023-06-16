
export default function Home() {
  return (
    <main className="grid grid-cols-2 min-h-screen">
      {/* left */}
      <div className="bg-[url(../src/assets/bg-stars.svg)] flex flex-col items-start justify-between px-28 py-16 relative overflow-hidden border-r border-white/10">
        
        {/* blur */}
        <div className= "absolute right-0 top-1/2 h-[288px] w-[526px] bg-purple-700 opacity-50 -translate-y-1/2 translate-x-1/2 rounded-full blur-full"/>
        
        {/* stripes */}
        <div className="absolute bottom-0 right-2 top-0 w-2 bg-stripes"/>
      </div>


      {/* right */}
      <div className="flex flex-col p-16 bg-[url(../src/assets/bg-stars.svg)] bg-cover">
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center leading-relaxed w-[360px]">
            Você não registrou nenhum momento, comece a {''}
            <a href="" className="font-bold underline hover:text-gray-50">
              criar agora!
            </a>
          </p>
        </div>
      </div>
    </main>
  )
}
