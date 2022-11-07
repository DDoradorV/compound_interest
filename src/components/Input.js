import { useField } from 'formik';
import './Input.css';

const Input = ({ label, ...props }) => {
    const [field, meta] = useField(props);

    return (
        <div className='control'>
            <label className='labelInput' >{label}</label>
            <input className='myInput' {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className='error'>{meta.error}</div>
            ) : null}
        </div> 
    )
}

export default Input;
