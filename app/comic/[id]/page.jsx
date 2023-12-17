"use client";

import { LatestComicsSkeleton } from "@/components/Skeletons";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export default function ComicPage({ params }) {
  const { id } = params;

  const queryClient = useQueryClient();
  const cacheData = queryClient.getQueryData(["getComicsInfinity"])?.pages.flatMap(page => page.data);

  console.log("cached", cacheData)
  console.log(cacheData?.find(data => data.main_id === parseInt(id)) || "null")
  // const result = useQuery({
  //   queryKey: ["getComic", id],
  //   queryFn: () => fetch("/todos"),
  //   initialData: () => {
  //     // Use a todo from the 'todos' query as the initial data for this todo query
  //     return queryClient.getQueryData(["todos"])?.find(d => d.id === todoId);
  //   }
  // });

  return (
    <main className="p-5">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tenetur deserunt tempore voluptatibus dolorum! Magnam quis enim quod
      nesciunt odit, quos laborum, distinctio at, tenetur quo assumenda impedit sint deserunt dolores vero odio praesentium nulla fuga
      corrupti mollitia asperiores eligendi eos? Rem porro, repellat est exercitationem modi fugit, voluptates odit sint omnis illum debitis
      consequuntur aliquid aperiam voluptatibus recusandae repudiandae! Porro magni adipisci nesciunt animi vero impedit totam inventore
      minus, corporis voluptatum atque expedita non obcaecati quibusdam. Ducimus aliquid omnis id suscipit maiores, animi iusto voluptatibus
      doloremque. Modi atque voluptatem laborum animi saepe quod ea nostrum alias labore vitae officiis et odio accusantium corporis rem
      laboriosam aut nulla sunt, numquam veniam itaque? Reprehenderit deserunt quas velit id, tempore sunt hic voluptatum voluptates quaerat
      error temporibus eligendi incidunt nostrum exercitationem tempora esse? Dolorum similique architecto quam dolorem placeat atque
      nostrum, ratione ab aperiam, perspiciatis sit dolore eligendi voluptate sed sapiente. A velit atque quod, dicta quos earum unde
      consequuntur cupiditate labore minima corporis in cum! Dolorum quia numquam magni, necessitatibus eligendi molestias incidunt iste,
      itaque voluptate quaerat unde, dignissimos facere laboriosam! Eaque iusto officiis laudantium amet tenetur reprehenderit eius,
      deleniti nesciunt qui quasi totam libero voluptatem ex vitae sapiente ut quidem voluptatum doloribus dolorum mollitia rerum quis
      recusandae quibusdam reiciendis. Sint dolorem recusandae, est qui nesciunt itaque possimus. Eius numquam voluptates sunt aliquam at
      amet, quibusdam, quas fugit velit id fuga voluptatibus veritatis quam totam excepturi eum adipisci, tenetur non ea natus labore
      exercitationem dolores! Laudantium sapiente, pariatur dolor eos ipsa labore perspiciatis quod exercitationem debitis maiores
      cupiditate fugiat eaque doloremque fugit? Tempora sequi numquam qui nesciunt assumenda dignissimos mollitia labore cum aut est soluta
      animi sapiente quaerat repudiandae hic earum sit possimus similique iure fuga, quo veniam? Beatae, accusantium eveniet qui
      praesentium, officiis molestiae rerum suscipit asperiores, necessitatibus labore debitis deleniti vero corporis cumque impedit magni
      consequuntur! Earum consequuntur perferendis repellendus voluptatem, quaerat facilis illo laudantium iure quod itaque provident
      officia, doloremque excepturi veniam sed quam necessitatibus commodi, eaque tempore. Reprehenderit ipsum quae veritatis ducimus ex
      illo accusantium fugiat possimus aliquid, unde molestiae, quo qui libero, voluptatem nulla esse beatae asperiores rerum maiores odit
      magni ipsa. Ea nulla corrupti, illum, vero obcaecati repellat maiores cupiditate voluptatum quaerat ab porro architecto quae eius
      blanditiis minus quos expedita dolor inventore sequi! Mollitia earum debitis facilis eveniet, praesentium sed natus vero tenetur?
      Saepe porro est debitis voluptatum deserunt adipisci possimus, repudiandae odio. Totam dolor quos repudiandae eveniet natus eos libero
      sequi doloribus fugiat omnis eaque laborum facere quia eligendi nemo, alias velit deserunt fugit neque odit praesentium in voluptate!
      Corporis sapiente ipsam sed totam officiis dolorum obcaecati provident officia facere ut quasi, dolorem in nulla odit quisquam
      pariatur reprehenderit porro aut nobis qui, ullam vitae. Ab nobis nam consequatur. Blanditiis natus cupiditate corrupti quam! Officia,
      perferendis? Blanditiis necessitatibus aperiam nesciunt asperiores est magnam, esse repellat minus laborum hic accusantium facilis,
      reiciendis architecto obcaecati magni! Doloribus deserunt asperiores, non at voluptates, dolores debitis ipsa cumque iure, neque saepe
      veritatis nemo! Enim sit doloremque illo minus ipsam suscipit quo incidunt ullam. Optio quisquam unde quia, perferendis ullam iste
      temporibus pariatur alias explicabo ad, vero quasi laborum sequi corporis consequuntur magni voluptas est, quo qui tempore id fugit
      quae necessitatibus! Dignissimos possimus qui odio in soluta explicabo neque facere ea illo pariatur labore accusamus eveniet maxime
      repellendus placeat, iste voluptas temporibus ratione, vel harum quas inventore quod. Porro facere, illum iure quas necessitatibus
      voluptas quia dolore qui. Repellendus tempore voluptas dicta omnis iusto odit, delectus minima beatae rem voluptatibus ea dolores ut
      numquam eum eligendi adipisci voluptate provident fugiat sint in error? Ipsum sunt voluptates eaque fugiat laborum, corrupti omnis
      molestiae non accusamus, ut rem assumenda? Doloribus numquam error, dignissimos est maxime incidunt reiciendis! Ducimus, voluptates
      velit numquam, quas id aut voluptas in non accusantium sint quod nostrum vero aliquam, dolores quae laboriosam rem! Aperiam deserunt
      animi quod consectetur omnis facere nihil, pariatur voluptatem facilis repellat rem molestias! Voluptas nemo quidem, porro,
      perferendis facilis repellat error nam at enim eum expedita quae, numquam iure delectus mollitia ab sapiente nostrum asperiores
      aspernatur assumenda pariatur maiores hic? Natus quidem excepturi voluptate beatae neque facilis laborum perspiciatis recusandae
      consectetur minima quae sunt repellendus mollitia, qui ipsa dolores officiis adipisci! Facilis, provident in doloribus nihil quae
      omnis porro repellat, doloremque, expedita voluptates perspiciatis quaerat fugit blanditiis fuga reiciendis eligendi laborum
      recusandae totam deleniti facere consectetur tempore nostrum. Amet, culpa aperiam! Totam architecto, voluptatem minima ex ratione
      sapiente at possimus quos fugit consequatur deserunt eos, cum, aut explicabo laborum aspernatur nemo mollitia tempora animi fugiat
      sit. In id atque corporis omnis dolor quia placeat nisi incidunt nulla! Optio est doloremque sed qui facere cum maxime minima,
      repellat vero nesciunt, aliquam earum mollitia voluptate! Voluptates dolor a perferendis quisquam officiis. Voluptatem dolore modi
      omnis esse asperiores amet doloribus excepturi ut, magnam non tenetur ab ducimus animi porro minus, voluptates, reprehenderit
      blanditiis aspernatur. Non ducimus sapiente, dicta, repellendus reiciendis doloribus optio quas, voluptatum velit repellat libero
      minus quam eligendi labore quaerat vero distinctio totam? Nam consequuntur corporis aut accusamus et nesciunt, asperiores nobis,
      voluptatibus exercitationem libero excepturi qui quibusdam? Harum repellendus repudiandae beatae. Suscipit eos laboriosam, quam iusto
      a odit cupiditate aspernatur iste maiores impedit saepe nostrum id vel fugit quo? Inventore quia asperiores repellat dicta eaque
      veritatis, reprehenderit provident, laboriosam expedita at porro harum commodi aliquam dolores ab. Provident excepturi voluptatum
      ducimus perferendis eum deleniti exercitationem, labore iste sunt, sit odit. Dicta tenetur unde itaque molestiae molestias odit quo
      iure, eius quasi officia sed suscipit fugit, quisquam odio accusamus? Magni eum quisquam odit! Porro rem, voluptatum placeat, nobis
      quos nemo vero eum, accusantium maiores blanditiis aliquid quam! Accusantium similique eaque quas excepturi? Quod repellendus
      inventore quam placeat repudiandae fugiat rem voluptate soluta! Itaque quas tempore distinctio impedit voluptas veniam? Tempora
      pariatur ut modi culpa fuga ipsum commodi ipsam eligendi, quae quo labore velit iure doloremque sunt recusandae. Beatae nesciunt
      molestias, possimus adipisci asperiores placeat ipsa eum, tempora sed quas porro culpa similique impedit corporis. Necessitatibus est
      fugit ipsa nemo ad architecto doloribus.
      {/* <h2>{!isLoading && comic.title}</h2>
      <p>{!isLoading && comic.description}</p>
      <div className="mt-5 flex flex-col gap-3">
        <strong>Available chapter</strong>
        {!isLoading && comic.scraps.map((extra) => (
          <a key={extra.id} href={extra.link_chapter} target="_blank">{extra.source} - Chapter {extra.latest_chapter}</a>
        ))}
      </div> */}
    </main>
  );
}
