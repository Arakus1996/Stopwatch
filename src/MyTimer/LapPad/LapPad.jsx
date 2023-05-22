import style from "./LapPad.module.css"
export const LapPad = (props) => {
    let lapElements = props.lapTime.map((lapElem, index) => <Lap inedexElem={index} key={index} lapElem={lapElem} time={props.time[index]} />).reverse()
    return <>
        <div className={style.timer + ' ' + style.lapPad}>
            <table>
                <thead>
                    <tr>
                        <th className={style.lapPad__lapColumn}>Кргу</th>
                        <th className={style.lapPad__lapTimeColumn}>Время</th>
                        <th className={style.lapPad__timeColumn}>Общее время</th>
                    </tr>
                </thead>
                <tbody>
                    {lapElements}
                </tbody>
            </table>
        </div>
    </>
}

const Lap = (props) => {
    let lapNumber = props.inedexElem + 1
    return <>
        <tr><td>{lapNumber}</td><td>{props.lapElem}</td><td>{props.time}</td></tr>
    </>
}