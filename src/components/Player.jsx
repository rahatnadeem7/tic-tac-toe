import {useState} from 'react';

export default function Player({initialName, symbol, isActive, onChangeName}) {

const [ playerName, setPlayerName] = useState(initialName);
const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing);

        if(isEditing){  
        onChangeName(symbol, playerName)
        }
    }

    function handleChange(event) {
        // console.log(event);
        setPlayerName(event.target.value) 
       }

    let editiblePlayerName = <span className='player-name'>{playerName}</span>;
    let btnCaption = 'Edit'
    if(isEditing) {
        editiblePlayerName = <input type="text" required value={playerName} onChange={handleChange} />;
        btnCaption = 'Save'

    }
    
    return (
        <li className={isActive ? 'active' : undefined }>
      <span className="player">
      {editiblePlayerName}
      <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{btnCaption}</button>
      </li>
    )
}