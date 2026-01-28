"use client"

import { useState, type ReactNode } from "react"
import { Grid3X3, Layers, LayoutList, Brain, Cpu, Eye, Users, BookOpen, MessageSquare, Coffee, Dumbbell } from "lucide-react"

export type LayoutMode = "stack" | "grid" | "list"

export interface InterestCardData {
  id: string
  title: string
  description: string
  icon?: ReactNode
  category: "professional" | "personal"
}

export interface InterestCardsProps {
  cards?: InterestCardData[]
  className?: string
  defaultLayout?: LayoutMode
}

const layoutIcons = {
  stack: Layers,
  grid: Grid3X3,
  list: LayoutList,
}

function CardContent({ card }: { card: InterestCardData }) {
  return (
    <div className="flex items-start gap-3">
      {card.icon && (
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          card.category === "professional"
            ? "bg-ink/5 text-ink"
            : "bg-amber-500/10 text-amber-600"
        }`}>
          {card.icon}
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3 className="font-semibold text-ink text-base leading-tight">{card.title}</h3>
          <span className={`text-[10px] uppercase tracking-wider font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${
            card.category === "professional"
              ? "bg-ink/5 text-muted"
              : "bg-amber-500/10 text-amber-600"
          }`}>
            {card.category === "professional" ? "Research" : "Life"}
          </span>
        </div>
        <p className="text-sm text-muted leading-relaxed">
          {card.description}
        </p>
      </div>
    </div>
  )
}

export default function InterestCards({
  cards = [],
  className = "",
  defaultLayout = "stack",
}: InterestCardsProps) {
  const [layout, setLayout] = useState<LayoutMode>(defaultLayout)
  const [activeIndex, setActiveIndex] = useState(0)

  if (!cards || cards.length === 0) {
    return null
  }

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % cards.length)

  // Get cards in stack order (show 4 cards max)
  const getStackCards = () => {
    const result: Array<InterestCardData & { stackPosition: number }> = []
    for (let i = 0; i < Math.min(cards.length, 4); i++) {
      const index = (activeIndex + i) % cards.length
      result.push({ ...cards[index], stackPosition: i })
    }
    return result.reverse()
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Layout Toggle */}
      <div className="flex items-center justify-center gap-1 rounded-full border border-line bg-card p-1 w-fit mx-auto shadow-soft">
        {(Object.keys(layoutIcons) as LayoutMode[]).map((mode) => {
          const Icon = layoutIcons[mode]
          return (
            <button
              key={mode}
              onClick={() => setLayout(mode)}
              className={`rounded-full p-2.5 transition-colors duration-150 ${
                layout === mode
                  ? "bg-ink text-white shadow-sm"
                  : "text-muted hover:text-ink hover:bg-ink/5"
              }`}
              aria-label={`Switch to ${mode} layout`}
            >
              <Icon className="h-4 w-4" />
            </button>
          )
        })}
      </div>

      {/* Stack Layout */}
      {layout === "stack" && (
        <div className="relative h-[320px] w-full max-w-[320px] mx-auto">
          {getStackCards().map((card) => (
            <div
              key={card.id}
              onClick={card.stackPosition === 0 ? nextCard : undefined}
              className="absolute inset-0 rounded-2xl border border-line bg-card p-5 shadow-soft transition-all duration-200 ease-out cursor-pointer hover:shadow-lift"
              style={{
                transform: `translateX(${card.stackPosition * 8}px) translateY(${card.stackPosition * 8}px) rotate(${card.stackPosition * 2}deg)`,
                zIndex: 10 - card.stackPosition,
              }}
            >
              <CardContent card={card} />
              {card.stackPosition === 0 && (
                <div className="absolute bottom-4 left-0 right-0 text-center">
                  <span className="text-xs text-muted/50 font-medium">Click to see more</span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Grid Layout */}
      {layout === "grid" && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl border border-line bg-card p-5 shadow-soft hover:shadow-lift transition-shadow duration-200"
            >
              <CardContent card={card} />
            </div>
          ))}
        </div>
      )}

      {/* List Layout */}
      {layout === "list" && (
        <div className="flex flex-col gap-4 max-w-2xl mx-auto">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl border border-line bg-card p-5 shadow-soft hover:shadow-lift transition-shadow duration-200"
            >
              <CardContent card={card} />
            </div>
          ))}
        </div>
      )}

      {/* Pagination dots for stack mode */}
      {layout === "stack" && cards.length > 1 && (
        <div className="flex justify-center gap-2">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === activeIndex
                  ? "w-6 bg-ink"
                  : "w-2 bg-muted/30 hover:bg-muted/50"
              }`}
              aria-label={`Go to card ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

// Pre-configured interest cards data
export const interestCardsData: InterestCardData[] = [
  {
    id: "medical-imaging",
    title: "Medical Imaging AI",
    description: "Building clinical-grade vision systems for MRI, radiology, and real-world diagnosis. Focused on models that work reliably in actual healthcare settings, not just benchmark leaderboards.",
    icon: <Brain className="h-5 w-5" />,
    category: "professional",
  },
  {
    id: "robust-ml",
    title: "Robust ML Systems",
    description: "Designing models and pipelines that survive scale, drift, and messy production realities. The gap between a working notebook and a reliable system is where the real engineering happens.",
    icon: <Cpu className="h-5 w-5" />,
    category: "professional",
  },
  {
    id: "multimodal",
    title: "Multimodal Intelligence",
    description: "Fusing vision, language, and structure into systems that reason across modalities. Interested in how different representations can complement each other for richer understanding.",
    icon: <Eye className="h-5 w-5" />,
    category: "professional",
  },
  {
    id: "hci",
    title: "Human–Computer Interaction",
    description: "Studying how people actually live with technology—and designing for that reality. Currently researching self-tracking practices and hybrid fitness ecologies in urban India.",
    icon: <Users className="h-5 w-5" />,
    category: "professional",
  },
  {
    id: "camus",
    title: "Albert Camus",
    description: "I keep coming back to Camus when I need clarity: meaning, discipline, and doing the work anyway. His absurdist lens makes the weight feel lighter, and his stories always read well.",
    icon: <BookOpen className="h-5 w-5" />,
    category: "personal",
  },
  {
    id: "debate",
    title: "Debate",
    description: "Where I learned to think clearly and develop precision in reasoning—to stay rigorous and critique myself without fear or bias. The skill transfers everywhere.",
    icon: <MessageSquare className="h-5 w-5" />,
    category: "personal",
  },
  {
    id: "coffee",
    title: "Coffee",
    description: "A daily ritual I'm irrationally serious about. There's something grounding about the process—grinding, brewing, tasting. Gotta cherish the little things in life.",
    icon: <Coffee className="h-5 w-5" />,
    category: "personal",
  },
  {
    id: "calisthenics",
    title: "Calisthenics",
    description: "It's all about showing up every day and putting in the work. The discipline carries over—consistency beats intensity, and progress is earned through patience.",
    icon: <Dumbbell className="h-5 w-5" />,
    category: "personal",
  },
]
