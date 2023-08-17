import React, {useEffect, useState} from 'react';

const NavBarButton = ({text, state, onClick, id}) => {
    function isInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        );
    }

    const [isInView, setIsInView] = useState(false);

    const addEvent = (box) => {
        document.addEventListener('scroll', function () {
            isInViewport(box) ?
                setIsInView(true) :
                setIsInView(false);

        }, true);
    }

    useEffect(() => {
        if(id !== undefined) {
            const box = document.querySelector('#' + id)

            if (box !== null && box !== undefined) {
                addEvent(box)
            }
        } else {
            if(text === state) {
                setIsInView(true)
            } else {
                setIsInView(false)
            }
        }
    })

    return <button onClick={() => onClick(text)}
                   className={(isInView ? "dark:bg-[#1f2733] bg-white shadow-md dark:shadow-gray-800" : "dark:bg-[#1f2733] bg-[#F7FAFC]") + ' rounded-3xl min-h-14 min-w-[220px] flex py-4 mx-auto my-5 select-none drop-shadow'}>
        <div
            className={(isInView ? "bg-[#4fd1c5]" : "dark:bg-[#1f2733] bg-white") + " rounded-xl w-[30px] h-[30px] self-center ml-[20px] mr-3 items-center"}>
            <img src={require('./../../../assets/img/sidebar/' + text + (isInView ? "-w" : "") + ".png")} alt={text}
                 className='max-w-[20px] max-h-[20px] mt-[5px] ml-[5px] '></img>
        </div>
        <p className={'self-center ' + (isInView ? "dark:text-white" : "text-[#a0aec0]")}>{text}</p>
    </button>;
};

export default NavBarButton;
