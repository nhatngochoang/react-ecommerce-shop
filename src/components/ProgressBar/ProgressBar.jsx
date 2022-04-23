import React, { useEffect, useMemo, useRef } from 'react'
import './ProgressBar.css'

export default function ProgressBar() {

   const progressRef = useRef(null)
   const loadingRef = useRef(null)
   const circleRef = useRef(null)
   const loadingRefCircle = useRef(null)


   const fakeUploadPercentage = useMemo(() => {
      return [0, 10, 25, 40, 42, 60, 70, 75, 90, 100]
   }
      , []
   )

   /*
   useEffect(() => {
      let i = 0;
      const interval = setInterval(() => {
         const loadingText = loadingRef.current
         progressRef.current.style.width = fakeUploadPercentage[i] + "%";
         loadingText.innerHTML = fakeUploadPercentage[i] + "%";
         i++;
         // console.log(i);
         if (i === fakeUploadPercentage.length) {
            clearInterval(interval);
            loadingText.innerHTML = "Completed";
         }
      }, 1000);
      return () => {
         clearInterval(interval);
      }
   }, [fakeUploadPercentage])
*/
   useEffect(() => {
      let i = 0;

      const circumference = circleRef.current.getTotalLength();

      const interval = setInterval(() => {
         circleRef.current.style.strokeDashoffset =
            circumference - (fakeUploadPercentage[i] / 100) * circumference;
         const loadingText = loadingRefCircle.current
         loadingText.innerHTML = fakeUploadPercentage[i] + "%";
         i++;
         // console.log(i);
         if (i === fakeUploadPercentage.length) {
            clearInterval(interval);
            loadingText.innerHTML = "Ok :)";
         }
      }, 1000);
      return () => {
         clearInterval(interval);
      }
   }, [fakeUploadPercentage])

   return (
      <>
         {/* ProgressBar */}
         {/* <div className="progress-bar">
            <div className="progress" ref={progressRef}></div>
            <span className=" loading" ref={loadingRef}></span>
         </div> */}
         {/* Circle loading */}
         <svg className="progress2" width="100" height="100">
            <circle className="progress-circle" cx="50" cy="50" stroke="blue" r="30" fill="transparent" strokeWidth="5" ref={circleRef} />
            <text className="loading2" ref={loadingRefCircle} fill="blue" x="50" y="50" alignmentBaseline="middle" textAnchor="middle"></text>
         </svg>
      </>
   )
}
