import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t py-5 md:py-5">
      <div className="container flex flex-col items-center justify-center gap-2 md:h-16 mx-auto max-w-4xl">
        <p className="text-center text-sm text-muted-foreground whitespace-nowrap">
          Based on the <a href="https://waitbutwhy.com/2014/05/life-weeks.html" className="font-medium underline underline-offset-4 hover:text-primary">Your Life in Weeks</a> post by Tim Urban, from <a href="https://waitbutwhy.com/" className="font-medium underline underline-offset-4 hover:text-primary">Wait But Why</a>.
        </p>
        <p className="text-center text-sm text-muted-foreground whitespace-nowrap">
          Made with ☕ and ❤️ by <a href="https://linktr.ee/andrewmos" className="font-medium underline underline-offset-4 hover:text-primary">Andres Mosquera</a>
        </p>
        <p className="text-center text-sm text-muted-foreground whitespace-nowrap">
          <a href="https://github.com/andresmosqueraw/your-life-in-weeks" className="font-medium underline underline-offset-4 hover:text-primary">See the code on Github</a>
        </p>
      </div>
    </footer>
  )
}

