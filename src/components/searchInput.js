import { TextInput } from 'flowbite-react';
import { HiSearch } from 'react-icons/hi';

export default function SearchInput(props) {
  return (
    <div className="max-w-md">
      <TextInput shadow={false} id="email4" type="search" icon={HiSearch} placeholder="Digite um título" required onChange={(e) => {props.function(e.target.value)}} />
    </div>
  );
}
