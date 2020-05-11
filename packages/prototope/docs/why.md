# Why?

Prototope serves a very specific purpose in the Isotope ecosystem. It's meant to be the go-to CSS-in-JS library. However, in comparison to most of today's CSS-in-JS solutions, it takes a fresh, utility-based approach.

## Tailwind-inspired

Prototope is heavily inspired by a well-known CSS prototyping library called [Tailwind](https://tailwindcss.com/). However, there are some obvious differences between the two, which may heavily influence your decision-making process.

### Language

Prototope is meant for use with JavaScript/TypeScript, whereas Tailwind works with CSS and many of its extension languages. Which approach you prefer is up to you.

### Integration

Prototope is built from the ground-up to work with Isotope. It doesn't work with any other UI library or framework. Tailwind, on the other hand, because it's based on CSS, it integrates with many different libraries and frameworks - including Isotope. With that said, you should keep in mind that when using Prototope in combination with Isotope you get a much more pleasant and tightly-integrated development experience.

### Customization

Prototope allows for some customization it thorough a simple theme colors and breakpoints configuration. It also provides proper tooling for you to create your own utils with ease.

On the other hand, Tailwind is even more customizable allowing you to configure most of its utils and functionalities. And, as it's based on CSS, creating your own utils means simply creating new class names. However, it should be noted that all these customization options can be confusing for those who haven't used the library before.

### Ease-of-use

Ease-of-use and development experience is where Prototope really shines. Because it's a pure JS library, you don't need to set up any additional tooling to get started. It also provides a nice API that integrates beautifully with Isotope.

Tailwind is also quite easy to set up. Because it's a CSS library you can only load the CSS file and you're good to go. However, it's worth noting that it's not the recommended setup. Tailwind's unprocessed CSS file weights a lot more than Prototope, and thus it's recommended to be used with a set of processing tools like PostCSS.

Overall, the decision-making process is simple. If you use Isotope and prefer CSS-in-JS over usual CSS and its processors (like SCSS), then go with Prototope. Otherwise, you should be happy with Tailwind.
