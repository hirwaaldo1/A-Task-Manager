interface Props {
  onSearch?: boolean;
}
export default function Empty(props: Props) {
  return (
    <div className="w-full h-full flex justify-between items-center">
      <img
        draggable={false}
        src={props.onSearch ? "/assets/empty.PNG" : "/assets/focus.PNG"}
        className="w-60 mx-auto -mt-20 rounded-sm"
        alt="empty"
      />
    </div>
  );
}
