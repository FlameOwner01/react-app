import { useEffect, useState } from 'react';
import { read, insert, update, remove } from '../services/apiService';

const Student = ({match, history}) => {

    const [id] = useState(match.params.id);
    const [student, setStudent] = useState({
        _id: '0',
        firstName: '',
        lastName: '',
        yearOfBirth: 0,
        address: ''
    });

    useEffect(() => {
        if(id!=='0'){
            read('students', id, data =>{
                if(data) setStudent(data);
            })
        }
    }, [id]);

    function changeHandler(e){
       
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        });
    }   

    const back = () =>{
        history.push('/students');
    }

    const save = () => {
        if(id === '0'){
            student._id = undefined;
            insert('students', student, data =>{
                if(data) return history.push('/students');
                console.log('There was an error during save data');
            })
        }else{
            update('students', id, student, data =>{
                if(data) return history.push('/students');
                console.log('There was an error during save data');
            })
        }
    }

    const del = () =>{
        remove('students', id, data =>{
            history.push('/students');
        })
    }

    return (
        <div className= 'container'>
        <h2>Student</h2>
        
        <form className='input-form'>

            <div style= {{margin: '12px 0', padding: '6px'}}>
                <label htmlFor='firstName'>
                    Student first name:
                </label>
                <input type = 'text' name = 'firstName' value = {student.firstName} onChange ={changeHandler} required/>
            </div>

            <div style= {{margin: '12px 0', padding: '6px'}}>
                <label htmlFor='lastName'>
                    Student last name:
                </label>
                <input type = 'text' name = 'lastName' value={student.lastName} onChange ={changeHandler} required/>
            </div>

        <div style= {{margin: '12px 0', padding: '6px'}}>
                <label htmlFor='yearOfBirth'>
                    Students year of birth:
                </label>
                <input type = 'text' name = 'yearOfBirth' value={student.yearOfBirth} onChange ={changeHandler}/>
        </div>
        
        <div style= {{margin: '12px 0', padding: '6px'}}>
                <label htmlFor='address'>
                    Address:
                </label>
                <input type = 'text' name = 'address' value={student.address} onChange ={changeHandler}/>
        </div>

        <hr/>
        {id !== '0' && (
        <div className = 'left'>
            <button type = 'button' onClick= {del}>DELETE</button>
        </div>
        )}
            <div className= 'right'>
                <button type = 'button' onClick={back}>BACK</button>
        &nbsp;&nbsp;&nbsp;
                <button type = 'button' onClick={save}>SAVE</button>
            </div>

        </form>
        </div>
    );
}

export default Student;