import ReactWordcloud from 'react-wordcloud';

const WordCloudView = ({ words }) => {
  const options = {
    rotations: 2,
    rotationAngles: [-90, 0],
    fontSizes: [12, 50],
  };

  return (
    <div className="w-full h-[400px]">
      <ReactWordcloud words={words} options={options} />
    </div>
  );
};
export default WordCloudView;