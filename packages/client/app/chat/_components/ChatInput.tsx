import { Button } from 'app/components/ui/button';
import { Input } from 'app/components/ui/input';

type ChatInputProps = {
  inputText: string;
  onInputChange: (text: string) => void;
  onSubmit: () => void;
  examples: string[];
  onExampleClick: (example: string) => void;
};

export const ChatInput = ({ inputText, onInputChange, onSubmit, examples, onExampleClick }: ChatInputProps) => {
  return (
    <div className="border-t bg-white fixed bottom-16 left-0 right-0">
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
        <Button className="bg-[#4a665e] hover:bg-[#3d5750]" onClick={onSubmit}>
          送信
        </Button>
      </div>
    </div>
  );
};
