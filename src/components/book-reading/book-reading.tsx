import { getBookById } from '@/lib/data';
import { useSuspenseQueries } from '@tanstack/react-query';

type Props = {
  bookId: string;
  pageNumber: number;
};

export default function BookReading({ bookId, pageNumber }: Props) {
  const [{ data: book }] = useSuspenseQueries({
    queries: [
      {
        queryKey: ['getBookById', bookId],
        queryFn: () => getBookById(bookId),
      },
    ],
  });

  console.log(pageNumber);

  return (
    <div className="relative">
      <div
        className="fixed left-0 top-0 h-screen w-full max-w-7xl bg-cover bg-fixed bg-center opacity-10"
        style={{ backgroundImage: `URL(${book.imageUrl})` }}
      ></div>
      <p>{book.title}</p>
      <div className="flex flex-col gap-y-4 p-10">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis saepe
          consectetur molestiae autem dolore eveniet vel, similique id error velit neque
          eius explicabo iste laborum exercitationem nesciunt recusandae quae quaerat
          cumque? Labore explicabo ut nisi modi ad, dignissimos facilis quae delectus,
          nemo ratione maiores minus quas hic corporis consequuntur quos placeat natus eos
          quam et ullam error vel? Voluptatibus, illo! Laudantium corporis a ut, quibusdam
          delectus dolores, aliquid qui fugiat earum ullam pariatur deserunt quisquam
          blanditiis, maxime ipsa perferendis nisi dolore quas sunt? Animi aliquam
          voluptate quo! Soluta dolorem, expedita quae commodi dolore totam! Facilis
          fugiat ullam corporis voluptatem eum!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque rem vero
          recusandae assumenda, cupiditate fugiat, voluptatum voluptatem totam
          voluptatibus, fugit eveniet excepturi consectetur quisquam? Magni doloremque
          recusandae in corporis, natus laborum voluptas architecto omnis soluta libero
          fuga. Error provident exercitationem itaque molestias soluta. Odio, quaerat eum!
          Obcaecati exercitationem quaerat labore assumenda provident? Commodi, voluptatem
          perferendis hic ipsa, pariatur, placeat quaerat tenetur maxime laboriosam esse
          inventore itaque ab sapiente voluptatibus. Corrupti recusandae vero, soluta
          facere quo assumenda? Modi illo tenetur iure possimus asperiores. Blanditiis
          officiis iure, sequi molestias amet aut voluptates soluta saepe fugiat delectus
          accusamus quos dolores dignissimos. Labore, earum?
        </p>
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto fugiat ipsa
          ad nemo nobis perspiciatis aspernatur placeat facere minima quaerat veritatis
          debitis ut rerum consectetur doloribus error voluptate sunt, neque dolore itaque
          assumenda laborum? Repellendus, omnis? Voluptates quidem minus nesciunt sit
          veritatis et facilis quibusdam beatae dolores nihil blanditiis rerum,
          consequuntur mollitia saepe ad eius eligendi quaerat molestiae. Aliquid, ipsum
          neque! Repudiandae odio veritatis, ea, omnis mollitia, quis repellendus neque
          accusantium asperiores similique molestiae sapiente? Alias, dicta sint! Earum
          amet beatae animi obcaecati quidem modi ullam inventore, quae expedita totam at
          tempore doloribus, temporibus vitae dolore dignissimos laboriosam id similique.
        </p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat nisi vitae,
          dignissimos libero fugiat tempore maxime? Corporis, ut architecto? Doloribus
          facere numquam sunt rerum, nulla nihil dolore similique, eaque nostrum hic error
          ad reiciendis expedita commodi, sint fuga. Magni dignissimos, excepturi sit
          quasi pariatur atque corporis, totam quisquam perferendis, necessitatibus
          exercitationem sequi saepe omnis explicabo ipsam perspiciatis unde reiciendis
          suscipit repellendus possimus? Officiis, maxime quibusdam? Cupiditate
          reiciendis, iure cum fugit unde soluta laudantium magni ducimus natus sed fuga
          veniam sit doloremque? Vel necessitatibus suscipit debitis laborum modi quaerat
          ducimus impedit, omnis mollitia? Similique magnam nulla sapiente fugit nostrum?
          Illo, omnis.
        </p>
      </div>
    </div>
  );
}
