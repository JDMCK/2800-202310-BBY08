const Tab = ({onClick, selected, tabName}) => {

    return (
        <button className={selected ? 'selected' : 'not-selected'} onClick={onClick} value={tabName}>
            {tabName}
        </button>
    )
}

export default Tab;