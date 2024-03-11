import { useState, useEffect } from "react";
import Error from "./Error";

function Form({patients, setPatients, patient}) {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [symptoms, setSymptoms] = useState('');

    const [error, setError] = useState(false)

    useEffect(() => {
        if( Object.keys(patient).length > 0) {
            setName(patient.name)
            setOwner(patient.owner)
            setEmail(patient.email)
            setDate(patient.date)
            setSymptoms(patient.symptoms)
        }
    },[patient])

    const generateId = () => {
        const random = Math.random().toString(36).slice(2);
        const date = Date.now().toString(36)

        return random + date
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        //Form Validation
        if( [ name, owner, email, date, symptoms ].includes('') ){
            console.log('There is at least one field in blank')

            setError(true)
            return;
        }
        
        setError(false)

        //Patients object
        const objectPatient = {
            name,
            owner,
            email,
            date,
            symptoms,
            id: generateId()
        }

        if(patient.id) {
            // Edit an existing record
            objectPatient.id = patient.id
            const updatedPatients = patients.map( patientState => patientState.id === patient.id ? objectPatient : patientState)

            setPatients(updatedPatients)
            setPatient({})
            
        } else {
            // New record
            objectPatient.id = generateId()
            setPatients([...patients, objectPatient]);
        }

        //Restart form
        setName('')
        setOwner('')
        setEmail('')
        setDate('')
        setSymptoms('')
    }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Patient Follow-up</h2>

      <p className="text-lg mt-5 text-center mb-10">
        Add patients and {''}
        <span className="text-indigo-600 font-bold">Manage them</span>
      </p>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
    >
        { error &&  <Error><p>All fields are required</p></Error>}
        <div className="mb-5">
            <label htmlFor="pet" className="block text-gray-700 uppercase font-bold">
                Pet Name
            </label>
            <input
                id="pet"
                type="text"
                placeholder="Pet Name"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="owner" className="block text-gray-700 uppercase font-bold">
                Owner Name
            </label>

            <input
                id="owner"
                type="text"
                placeholder="Owner Name"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={owner}
                onChange={(e) => setOwner(e.target.value)}
            />
        </div>
        
        <div className="mb-5">
            <label htmlFor="email" className="block text-gray-700 uppercase font-bold">
                Owner Email
            </label>

            <input
                id="email"
                type="email"
                placeholder="Owner Email"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="release" className="block text-gray-700 uppercase font-bold">
                Release Date
            </label>

            <input
                id="release"
                type="date"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
        </div>

        <div className="mb-5">
            <label htmlFor="symptoms" className="block text-gray-700 uppercase font-bold">
                Symptoms
            </label>

            <input
                id="symptoms"
                type="text"
                className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
            />
        </div>

        <input
            type="submit"
            className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all rounded-lg"
            value={ patient.id ? 'Edit Patient' : 'Add Patient'}
        />
      </form>
    </div>
  )
}

export default Form

