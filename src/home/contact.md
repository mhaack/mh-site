---
theme:
  background: bg-jungle-green-500
  text: text-slate-100
order: 5
sitemap:
  ignore: true
---

Get In Touch

<section id="contact">
  <div class="relative flex flex-col bg-white shadow-lg mt-4 p-8">
    <div class="w-full max-w-screen-md mx-auto text-xl">
      <p class="text-gray-900">Want to have a chat? Send me a message.</p>
      <form name="contact" method="post" action="/success">
        <input type="hidden" name="form-name" value="contact"/>
        <div class="grid grid-cols-1 md:grid-cols-2 md:gap-4 mt-2">
          <div class="mt-4">
          <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              aria-label="Name"
              class="contact"
              spellcheck="false"
              data-ms-editor="true"/> </div>
          <div class="mt-4">
          <input type="email" name="email" id="email" placeholder="Email" aria-label="Email" class="contact"/> </div>
        </div>
        <div class="mt-4">
          <textarea
            name="message"
            id="message"
            placeholder="Message"
            aria-label="Message"
            rows="4"
            class="contact"
            spellcheck="false"
            data-ms-editor="true"></textarea>
        </div>
        <div class="mt-4">
          <button
            type="submit"
            value="Send Message"
            class="h-8 px-4 text-white bg-jungle-green-800 leading-tight shadow-md transform hover:bg-jungle-green-600 hover:shadow-lg hover:scale-110 focus:bg-jungle-green-600 focus:shadow-lg focus:outline-none focus:ring-0 focus:scale-110 active:bg-jungle-green-600 active:shadow-lg transition  duration-500 ease-in-out">
            Send Message</button>
        </div>
      </form>
    </div>
  </div>
</section>
