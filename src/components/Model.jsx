import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ModelView from './ModelView'

console.log('model.jsx wird geladen')

gsap.registerPlugin(useGSAP);

const Model = () => {
 

    return (
        <section className="">
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
