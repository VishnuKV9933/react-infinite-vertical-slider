
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import './App.css';

function App() {
  const carouselRef = useRef<HTMLUListElement | null>(null);
  const elemRef = useRef<HTMLLIElement | null>(null);
   const [isMouseDawn,setMouseDown]=useState(false)
      const [startY,setStartY]=useState(0)
      const [scrollTop,setScrollTop]=useState(0)

      const [cardPerView,setCardPerView] = useState(0)
      const [firstCardHeight,setFirstCardHeight] =  useState(0)
      const [carouselChildren, setCarouselChildren] = useState<Element[] | null>(null);
      useLayoutEffect(()=>{
        setCarouselChildren(
            () => {
                const children = carouselRef.current?.children;
                return children ? [...children] : [];}
        )
    },[])

    useLayoutEffect(()=>{
      if(elemRef.current){
        console.log(elemRef.current.offsetHeight,"elemRef.current.offsetWidth");
        
          setFirstCardHeight(elemRef.current.offsetHeight)
      }
  
  
  },[elemRef.current?.offsetWidth])

  useLayoutEffect(()=>{
    if(carouselRef.current){
        let cardView =Math.round(carouselRef?.current?.offsetWidth / firstCardHeight)
        // setCardPerView(cardView)
        setCardPerView(6)
    }
},[])


useEffect(()=>{

  function insetCopiesToTop(){

    // console.log("evidekeri",carouselChildren);
      if(carouselChildren){
        carouselChildren.slice(-cardPerView).reverse().forEach((elem)=>{
      
            
            carouselRef.current?.insertAdjacentHTML('afterbegin',elem.outerHTML)
        })
      }
      
      
  }

  function insetCopiesToEnd(){
      if(carouselChildren){

        carouselChildren.slice(0,cardPerView).forEach((elem)=>{
            
            carouselRef.current?.insertAdjacentHTML('beforeend',elem.outerHTML)

     
        })
      }
  }

  insetCopiesToTop()
  insetCopiesToEnd()
},[carouselChildren])


useEffect(()=>{
  carouselRef.current?.addEventListener('scroll',infinitescroll)
  return ()=>{
      carouselRef.current?.removeEventListener('scroll',infinitescroll)
  }
},[])

function infinitescroll(){

  if(carouselRef.current){



  }

  
 if(carouselRef.current&&elemRef?.current?.offsetTop){
        console.log(firstCardHeight,"firstCardWidth");
        
      if(carouselRef.current?.scrollTop===0){
          carouselRef.current.classList.add('no-transition')
          carouselRef.current.scrollTop=(2*(carouselRef?.current?.offsetHeight)+(2*elemRef.current.offsetHeight))
     
       
          carouselRef.current.classList.remove('no-transition')
      }else if(carouselRef.current?.scrollTop ===
        carouselRef.current?.scrollHeight - carouselRef.current?.offsetHeight){

        console.log("bottom-end");
        
          carouselRef.current.classList.add('no-transition')
          carouselRef.current.scrollTop=((carouselRef?.current?.offsetHeight)+(2*elemRef.current.offsetHeight))
          carouselRef.current.classList.remove('no-transition')
      }
  }


}

    // mouse controll

    function handleMouseDawn(e: React.MouseEvent<HTMLUListElement>){
      setMouseDown(true)
      if (carouselRef.current) {
        carouselRef.current.classList.add("dragging")
          setStartY(e.pageY - carouselRef.current.offsetTop as number);
          setScrollTop(carouselRef.current?.scrollTop)
        }
  }

  function handleMouseLeave(e: React.MouseEvent<HTMLUListElement>|React.TouchEvent<HTMLUListElement>){
      setMouseDown(false)

  }

  function handleMouseUp(){
      setMouseDown(false)
      if(carouselRef.current){
        carouselRef.current.classList.remove('dragging')
      }
  }

  function handleMouseMove(e: React.MouseEvent<HTMLUListElement>){
      if(!isMouseDawn) return
      e.preventDefault()
      if (carouselRef.current) {

          const y =e.pageY-carouselRef.current?.offsetTop;
          const walk = (y-startY)
          carouselRef.current.scrollTop=scrollTop-walk
      }

  }
  
  return (
    <div className="app">
    <div className="wrapper w-[200px] h-[400px] sm:h-[450px] md:h-[600px] mt-3">
      <ul
      ref={carouselRef}
      onMouseDown={handleMouseDawn}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
       className="carousel h-full w-full">
        <li
         ref={elemRef}
         className="card bg-black border  w-full">
              
        </li>
        <li className="card bg-blue-200 border">
              
        </li>
        <li className="card bg-green-300 border">
              
        </li>
        <li className="card bg-yellow-400 border">
        </li>
        <li className="card bg-red-500 border">
              
        </li>
        <li className="card bg-indigo-600 border">
              
        </li>
     

      </ul>
    </div>
</div>
  );
}

export default App;
