import React, {useEffect} from 'react'


const FAQs = () => {


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
               <div className="full-width mb-2">
                 <h1>FAQs</h1>
               </div>
               <div className="full-width">
                 <ol>
                   <li className="mb-2">
                     <p>
                       <strong>
                         Lorem ipsum dolor, sit amet consectetur adipisicing
                         elit. Dignissimos quod assumenda officia{" "}
                       </strong>
                     </p>
                     <p>
                       Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                       Dignissimos quod assumenda officia itaque sequi saepe
                       tempore ipsam tenetur, odio minima excepturi iure quos
                       asperiores, voluptatibus incidunt. Optio, similique!
                       Asperiores, ullam. Lorem ipsum dolor, sit amet
                       consectetur adipisicing elit. Dignissimos quod assumenda
                       officia itaque sequi
                     </p>
                   </li>
                   <li className="mb-2">
                     <p>
                       <strong>
                         Lorem ipsum dolor, sit amet consectetur adipisicing
                         elit.
                       </strong>
                     </p>
                     <p>
                       Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                       Dignissimos quod assumenda officia itaque sequi saepe
                       tempore ipsam tenetur, odio minima excepturi iure quos
                       asperiores, voluptatibus incidunt. Optio, similique!
                       Asperiores, ullam. Lorem ipsum dolor, sit amet
                       consectetur adipisicing elit. Dignissimos quod assumenda
                       officia itaque sequi
                     </p>
                   </li>
                   <li className="mb-2">
                     <p>
                       <strong>
                         Dignissimos quod assumenda officia itaque sequi saepe
                         tempore ipsam tenetur,
                       </strong>
                     </p>
                     <p>
                       Dignissimos quod assumenda officia itaque sequi saepe
                       tempore ipsam tenetur, odio minima excepturi iure quos
                       asperiores, voluptatibus incidunt. Optio, similique!
                       Asperiores, ullam.
                     </p>
                   </li>
                 </ol>
               </div>
             </div>
           </div>
         </div>
       </div>
     </div>
   );
}

export default FAQs;