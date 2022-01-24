import React, {useEffect} from 'react'


const AboutUs = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

   return (
     <div className="full-width">
       <div className="container">
         <div className="row">
           <div className="col-12 col-lg-10 offset-lg-1 col-xl-8 offset-xl-2">
             <div className="full-width text-white bg-secondary p-2 p-lg-3 my-2">
               <h1>About us</h1>
               <p>
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                 Dignissimos quod assumenda officia itaque sequi saepe tempore
                 ipsam tenetur, odio minima excepturi iure quos asperiores,
                 voluptatibus incidunt. Optio, similique! Asperiores, ullam.
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                 Dignissimos quod assumenda officia itaque sequi saepe tempore
                 ipsam tenetur, odio minima excepturi iure quos asperiores,
                 voluptatibus incidunt. Optio, similique! Asperiores, ullam.
               </p>
               <p>
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                 Dignissimos quod assumenda officia itaque sequi saepe tempore
                 ipsam tenetur, odio minima excepturi iure quos asperiores,
                 voluptatibus incidunt. Optio, similique! Asperiores, ullam.
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                 Dignissimos quod assumenda officia itaque sequi
               </p>

               <p>
                 Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                 Dignissimos quod assumenda officia itaque sequi saepe tempore
                 ipsam tenetur, odio minima excepturi iure quos asperiores,
                 voluptatibus incidunt. Optio, similique! Asperiores, ullam.
               </p>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}

export default AboutUs;