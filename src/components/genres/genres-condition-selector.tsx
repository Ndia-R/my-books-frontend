import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useEffect, useState } from 'react';

type Props = {
  condition: string;
  onConditionChange: (condition: string) => void;
};

export default function GenresConditionSelector({ condition, onConditionChange }: Props) {
  const CONDITIONS = [
    { text: '単一選択', value: 'SINGLE' },
    { text: 'AND条件', value: 'AND' },
    { text: 'OR条件', value: 'OR' },
  ];

  const [selectedCondition, setSelectedCondition] = useState(condition);

  useEffect(() => {
    setSelectedCondition(condition);
  }, [condition]);

  const handleChangeCondition = (condition: string) => {
    setSelectedCondition(condition);
    onConditionChange(condition);
  };

  return (
    <RadioGroup
      className="flex gap-x-4"
      value={selectedCondition}
      onValueChange={handleChangeCondition}
    >
      {CONDITIONS.map((condition) => (
        <div
          className="flex flex-col-reverse items-center sm:flex-row"
          key={condition.value}
        >
          <RadioGroupItem value={condition.value} id={condition.value} />
          <Label
            className="cursor-pointer select-none p-2 text-xs sm:text-sm"
            htmlFor={condition.value}
          >
            {condition.text}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
