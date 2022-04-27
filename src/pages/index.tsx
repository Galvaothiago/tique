import { BetResult } from "../components/betResult";
import { CheckResult } from "../components/checkResult";
import { CreateBet } from "../components/createBet";
import { Header } from "../components/header";

export default function Home() {
  const URL_IMG = "https://github.com/Galvaothiago.png"

  return (
    <>
      <div className="xl:container mx-auto h-full bg-slate-200">
          <Header urlImg={URL_IMG}/>
          <CreateBet />
          <BetResult />
          <CheckResult />
      </div>
    
    </>
  )
}
