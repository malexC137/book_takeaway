const Message = ({message, error}) => {
    const textColor = error ? 'red' : 'black';
    return <p style={{paddingLeft: '40px', color: textColor}}>{message}</p>
}

export default Message;