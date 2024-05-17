"use client"
import Image from "next/image";
import EmpHero from "@/components/EmpHero/page";
import Category from "@/components/Category/page";
import Services from "@/components/Services/page";
const Employers = ()=>{
    return(
        <>
      
            <EmpHero />
            <Category />
            <Services /> 
        </>
    )
}
export default Employers;

