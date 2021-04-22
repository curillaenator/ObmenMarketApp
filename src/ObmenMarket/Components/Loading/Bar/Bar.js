const Bar = ({
  animationDuration,
  progress,
}) => (
  <div
    style={{
      background: '#7000ff',
      height: 2,
      left: 0,
      marginLeft: `${(-1 + progress) * 100}%`,
      position: 'fixed',
      top: 0,
      transition: `margin-left ${animationDuration}ms linear`,
      width: '100%',
      zIndex: 1031,
      borderRadius: 2
    }}
  >
    <div
      style={{
        boxShadow: '0 0 10px #7000ff, 0 0 5px #7000ff',
        display: 'block',
        height: '100%',
        opacity: 1,
        position: 'absolute',
        right: 0,
        transform: 'rotate(3deg) translate(0px, -4px)',
        width: 100,
      }}
    />
  </div>
)

export default Bar