import Hero from "../components/Hero";
import Home_card from "../components/Home_card";
import CallToAction from "../components/CallToAction";
import Features from "../components/Features";
import RecentIssues from "../components/RecentIssues";

export default function Home() {
  return (
    <>
      <Hero />
    
      <Home_card />
      <CallToAction />
      <Features />
      
      <RecentIssues />

    </>
  );
}