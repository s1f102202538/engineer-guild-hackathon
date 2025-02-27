import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';

type InputFormProps = {
  inputText: string;
  onInputChange: (text: string) => void;
  onSubmit: () => void;
  examples: string[];
  onExampleClick: (example: string) => void;
};

const InputForm = ({ inputText, onInputChange, onSubmit, examples, onExampleClick }: InputFormProps) => {
  return (
    <div className="bg-white pb-2">
      <div className="p-2 overflow-x-auto whitespace-nowrap">
        <div className="inline-flex">
          {examples.map((example, i) => (
            <Button
              key={i}
              variant="outline"
              className="mx-1 text-sm flex-shrink-0"
              onClick={() => onExampleClick(example)}
            >
              {example}
            </Button>
          ))}
        </div>
      </div>
      <div className="flex p-2 gap-2">
        <Input
          placeholder="入力してください"
          className="flex-1"
          value={inputText}
          onChange={(e) => onInputChange(e.target.value)}
        />
        <Button className="font-bold bg-green-600 hover:bg-green-400" onClick={onSubmit}>
          送信
        </Button>
      </div>
    </div>
  );
};

export default InputForm;
