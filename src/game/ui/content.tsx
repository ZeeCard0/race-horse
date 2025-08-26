import ListName from "./list-name";

export default function Content({ children }: React.PropsWithChildren) {
  return (
    <div className="flex h-full w-full">
      <ListName />
      {/* <div>asdkmsdl</div> */}
    </div>
  );
}
