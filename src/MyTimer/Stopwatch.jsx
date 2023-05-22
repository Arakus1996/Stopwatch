import { useState } from "react"
import style from "./Stopwatch.module.css"
import { LapPad } from "./LapPad/LapPad"

let t
export const Stopwatch = () => {
    const [time, setTime] = useState([])
    const [msTime, setMsTime] = useState(0)
    const [isStarted, setIsStarted] = useState(false)
    const [lapTime, setLapTime] = useState([])
    const [prevMsTime, setPrevMsTime] = useState(0)

    let ms = msTime

    const parseTime = (msTime) => {
        let m = Math.floor(msTime / 6000)
        let s = Math.floor((msTime / 100) - (m * 60))
        let ms = msTime - m * 6000 - s * 100
        if (ms < 10) ms = '0' + ms
        if (s < 10) s = '0' + s
        if (m < 10) m = '0' + m
        let result = m + ':' + s + ':' + ms
        return result
    }

    const startTimer = () => {
        if (!isStarted) {
            t = setInterval(timer, 10)
            setIsStarted(true)
        }
    }

    const stopTimer = () => {
        clearInterval(t)
        setIsStarted(false)
    }

    const lapTimer = () => {
        let diffLapTime = msTime - prevMsTime
        setLapTime(arr => [...arr, '+' + parseTime(diffLapTime)])
        setTime(arr => [...arr, parseTime(msTime)])

        setPrevMsTime(msTime)
    }

    const resetTimer = () => {
        clearInterval(t)
        setIsStarted(false)
        setMsTime(0)
        setLapTime([])
        setTime([])
        setPrevMsTime(0)
    }

    const timer = () => {
        ms++
        setMsTime(ms)
    }

    return (
        <>
            <div className={style.stopWatch}>
                <div className={style.timer + ' ' + style.timerPad}>
                    <h2>СЕКУНДОМЕР</h2>
                    <div className={style.timer__time}><span>{parseTime(msTime)}</span> <Clock isStarted={isStarted} msTime={msTime} /> </div>
                    <div className={style.timer__btnBlock}>
                        <button className={style.btn} onClick={startTimer}>СТАРТ</button>
                        <button className={style.btn} onClick={stopTimer}>СТОП</button>
                        <button className={style.btn} onClick={lapTimer}>КРУГ</button>
                        <button className={style.btn} onClick={resetTimer}>СБРОС</button>
                    </div>
                </div>
                <LapPad lapTime={lapTime} time={time} />
            </div>
        </>
    )
}

const Clock = (props) => {
    return <>
        <div className={style.stopWatch__animation}>
            <div className={style.stopWatch__animation_pad}>
                <div className={style.stopWatch__animation_arrow + ' ' +
                    (props.isStarted ? style.stopWatch__animation_arrow_start : props.msTime === 0 ? '' : style.stopWatch__animation_arrow_pause)}></div>
            </div>
        </div>
    </>
}

