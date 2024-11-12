import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModelViewEntry from "./ModelViewEntry";

console.log('entry.jsx wird geladen')

gsap.registerPlugin(useGSAP);

const Entry = () => {
    // useGSAP(() => {
    //     gsap.to('#heading', {
    //         y: 0,
    //         opacity: 1
    //     })
    // }, []);

    return (
        <section className="">
            <div className="screen-max-width">
                <div className="flex flex-col items-center mt-5">
                    {/* Setze die Höhe hier auf 100vh, damit das Canvas den gesamten Bildschirm einnimmt */}
                    <div className="w-full h-[100vh] overflow-hidden relative">
                        <ModelViewEntry />
                    </div>  
                   
                </div>
            </div>
        </section>
    );
}

export default Entry
