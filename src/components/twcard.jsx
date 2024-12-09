import React from'react';

function card() {
  return (
    <div>
      <section class="container mx-auto p-10 md:p-20 transform duration-500">
          <article class="flex flex-wrap md:flex-nowrap shadow-lg mx-auto max-w-xl ">
              <img class="w-full md:w-40 h-auto" src="https://weandthecolor.com/wp-content/uploads/2012/03/A-Way-Out-Illustration-by-Matheus-Lopes-4563464.jpg" alt="" />
              <div class="p-10 my-auto">
                  <h1 class="text-2xl font-semibold text-gray-800">A Way Out</h1>
                  <p class="text-base text-gray-400 mt-2">
                      Super creative and colorful illustrations by Matheus Lopes. Check out more of his amazing artworks in his portfolio.
                  </p>
              </div>
          </article>
      </section>
    </div>
    
  );
}

export default card;