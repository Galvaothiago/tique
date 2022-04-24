import { BetResult } from "../components/betResult";
import { CreateBet } from "../components/createBet";
import { Header } from "../components/header";

export default function Home() {
  const URL_IMG = "https://github.com/Galvaothiago.png"

  return (
    <>
      <Header urlImg={URL_IMG}/>
      <div className="xl:container mx-auto h-screen bg-slate-200">
          <CreateBet />
          <BetResult />
      </div>
    
    </>
  )
}
