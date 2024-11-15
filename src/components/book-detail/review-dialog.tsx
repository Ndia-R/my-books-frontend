import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';

export default function ReviewDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog className="w-[400px]" open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className="rounded-full" variant="outline">
            レビューを書く
          </Button>
        </DialogTrigger>
        <DialogContent>
          <Textarea></Textarea>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure temporibus quos
            sapiente, laboriosam officiis cupiditate corporis animi quae laborum incidunt
            dolor suscipit quam inventore sint, soluta esse ullam nulla minus.
          </p>
          <Button onClick={() => setIsOpen(false)}>CLOSE</Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
