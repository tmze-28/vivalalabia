import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModelView from "./ModelView";

console.log('model.jsx wird geladen')

gsap.registerPlugin(useGSAP);

const Model = () => {
    // useGSAP(() => {
    //     gsap.to('#heading', {
    //         y: 0,
    //         opacity: 1
    //     })
    // }, []);

    return (
        <section className="common-padding">
            <div className="screen-max-width">
                

             
                    {/* Setze die Höhe hier auf 100vh, damit das Canvas den gesamten Bildschirm einnimmt */}
                    <div className="w-full h-[100vh] overflow-hidden relative">
                        <ModelView />
                    </div>
                
            </div>
        </section>
    );
}

export default Model
