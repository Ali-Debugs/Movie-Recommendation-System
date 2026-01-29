import React, { useState, useEffect } from 'react'
import { Film, TrendingUp, Sparkles, Github } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import SearchBox from './components/SearchBox'
import MovieCard from './components/MovieCard'

// Import data
import movieData from './data/movie_data.json'
import recommendationsData from './data/recommendations.json'

function App() {
    const [selectedMovie, setSelectedMovie] = useState(null)
    const [recommendations, setRecommendations] = useState([])

    const handleSelectMovie = (movie) => {
        setSelectedMovie(movie)
        const recs = recommendationsData[movie.title] || []

        // Enrich recommendations with actual movie data if possible
        const enrichedRecs = recs.map(rec => {
            const fullData = movieData.find(m => m.title === rec.title)
            return fullData || rec
        })

        setRecommendations(enrichedRecs)

        // Scroll to results
        setTimeout(() => {
            window.scrollTo({ top: 500, behavior: 'smooth' })
        }, 100)
    }

    return (
        <div className="min-h-screen bg-[#050505] text-slate-100 font-sans selection:bg-primary-500/30">
            {/* Mesh Gradient Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary-900/10 blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-900/10 blur-[120px]" />
            </div>

            {/* Header */}
            <nav className="border-b border-white/5 bg-black/50 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                            <Film className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                            CineMatch
                        </span>
                    </div>
                    <div className="flex items-center gap-6">
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Discover</a>
                        <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">About</a>
                        <button className="p-2 text-slate-400 hover:text-white transition-colors">
                            <Github className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 md:py-24">
                {/* Hero Section */}
                <section className="text-center mb-24 relative">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-400 text-xs font-bold mb-8 uppercase tracking-widest"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        AI-Powered Recommendations
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-extrabold mb-8 tracking-tighter leading-tight"
                    >
                        Find your next <br />
                        <span className="gradient-text">cinematic Journey.</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed"
                    >
                        Type in a movie you loved, and let our recommendation engine unveil similar masterpieces tailored just for you.
                    </motion.p>

                    <SearchBox movieData={movieData} onSelect={handleSelectMovie} />
                </section>

                {/* Results Section */}
                <AnimatePresence mode="wait">
                    {selectedMovie ? (
                        <motion.section
                            key="results"
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -40 }}
                            className="space-y-12"
                        >
                            <div className="flex items-end justify-between border-b border-white/5 pb-6">
                                <div>
                                    <p className="text-primary-400 text-sm font-bold uppercase tracking-widest mb-2">Recommendations for</p>
                                    <h2 className="text-4xl font-bold">{selectedMovie.title}</h2>
                                </div>
                                <div className="text-slate-500 text-sm flex items-center gap-2">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Based on genre and themes</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {recommendations.map((movie, index) => (
                                    <motion.div
                                        key={movie.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <MovieCard
                                            title={movie.title}
                                            genre={movie.genre}
                                            overview={movie.overview}
                                            isRecommendation={true}
                                        />
                                    </motion.div>
                                ))}
                            </div>
                        </motion.section>
                    ) : (
                        <motion.section
                            key="placeholder"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="grid grid-cols-1 md:grid-cols-3 gap-8 opacity-40 grayscale"
                        >
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="glass-card h-64 border-dashed border-white/5 flex items-center justify-center">
                                    <div className="text-slate-600 flex flex-col items-center gap-4">
                                        <Film className="w-12 h-12" />
                                        <p className="font-medium text-sm tracking-widest uppercase">Select a movie to start</p>
                                    </div>
                                </div>
                            ))}
                        </motion.section>
                    )}
                </AnimatePresence>

                {/* Featured Section */}
                {!selectedMovie && (
                    <motion.section
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="mt-32 border-t border-white/5 pt-24"
                    >
                        <div className="flex items-center gap-3 mb-12">
                            <TrendingUp className="w-6 h-6 text-primary-500" />
                            <h2 className="text-2xl font-bold tracking-tight">Popular Starters</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {movieData.slice(0, 4).map((movie) => (
                                <button
                                    key={movie.id}
                                    onClick={() => handleSelectMovie(movie)}
                                    className="text-left"
                                >
                                    <MovieCard
                                        title={movie.title}
                                        genre={movie.genre}
                                        overview={movie.overview}
                                    />
                                </button>
                            ))}
                        </div>
                    </motion.section>
                )}
            </main>

            <footer className="border-t border-white/5 py-12 mt-24">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 opacity-50">
                        <Film className="w-5 h-5" />
                        <span className="font-bold text-sm tracking-tighter">CINEMATCH</span>
                    </div>
                    <p className="text-slate-500 text-sm">
                        &copy; 2026 CineMatch AI. Built for cinematic exploration.
                    </p>
                    <div className="flex gap-6 text-slate-500 text-sm">
                        <a href="#" className="hover:text-white">Privacy</a>
                        <a href="#" className="hover:text-white">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default App
