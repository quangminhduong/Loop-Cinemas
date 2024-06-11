const Card = (props) => {
  return (
    <div className={`${props.className} bg-white p-8 rounded-sm`}>
      {props.children}
    </div>
  );
};

export default Card;
