import '../assets/css/EmptyCard.css'


const bg_colors = [
  'linear-gradient(225deg, hsla(28, 100%, 52%, 1) 0%, hsla(45, 84%, 66%, 1) 100%)', //orange
  'linear-gradient(225deg, hsla(185, 100%, 29%, 1) 0%, hsla(186, 81%, 57%, 1) 100%)' //dark green
];

const line_colors = [
  '#FC8B1A', //orange
  '#058F9C' //dark green
];


const EmptyTask = (props) =>{
  
  const card_color = {
    color: "white",
    background: bg_colors[props.index]
  };
  
  const hr_color = {
    backgroundColor: line_colors[props.index],
    height: '1px'
  };

  return(
    <>
      <div className="empty-card" style={card_color}>
        <h3>{props.text}</h3>
      </div>
      <hr style={hr_color}/>
    </>
  )
}

export default EmptyTask;
