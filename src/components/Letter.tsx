"use client";

import { motion } from "framer-motion";

export default function Letter({ onNext, onRestart }: { onNext?: () => void; onRestart?: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex flex-col items-center justify-center py-20 px-4 sm:px-8 z-10 relative"
    >
      <motion.div 
        initial={{ y: 12, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.7, ease: "easeOut" }}
        className="max-w-2xl w-full bg-[#FCFBF9] text-[#2C3E50] p-8 md:p-14 rounded-sm shadow-[0_20px_50px_rgba(0,0,0,0.1)] transform -rotate-1 relative select-text"
        style={{
          backgroundImage: "radial-gradient(#e5e7eb 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      >
        <h2 className="text-3xl md:text-5xl font-heading font-bold text-[#4A1521] mb-8 text-center tracking-tight">
          My Dearest Ammuuuu! ❤️
        </h2>
        
        <div className="space-y-6 font-times text-lg sm:text-xl md:text-[21px] leading-[1.9] sm:leading-[2.0] text-[#241B17] tracking-[0.01em]">
          <p>
            Ammuuu finalllyyyyyy its ur day! ❤️ this is the best day of my life. finally tody u turned into 22 🥹❤️ musali danivi ayyipotunnav, 22 years back ee roju world loki oka beautiful little na bujji bangaram vachindi. And honestly I feel so lucky that I get to celebrate another year of your life. I just hope ee birthday neeku chala chala happiness teesukuraavali.
          </p>

          <p>
            My Bangarammmm okkasari aina ninnu nuvvu naa eyes lo chusukunte baagundu. Appudu ayna nek ardham avuthundhi nuv entha beautiful ga unnavo. Nee cute eyes, beautiful smile, nee expressions, nuv navvuthunte aa cuteness, nee bujji bujji lips tho sweetest maatalu... abba everything about you is just so adorable. Nuvvu em chesina naaku cute gaane anipisthav. Nuv eppudu ilage navvuthu undali ma, because nee smile chusthe naaku kuda automatic ga smile vachesthundhi. ❤️ Nee happiness lone na happiness undi.
          </p>

          <p>
            My Bujji Kanna, ippudu nuvvu 22 loki enter avuthunnav. I really wish ee year nek lots and lots happiness, mainly ye health issues undakunda, lots and lots of love and success tho nindipovaali. Nee heart lo unna chinna chinna dreams anni okkokatiga nijam avvali. Nuv anukunnavi anni achieve cheyyali... alage mana pelli kooda ayyipovali 😁 Manam chala chaalaaa places ki vellali, netho ee world motham explore cheyyali, and most importantly, nuvvu eppudu happy ga undali 💖
          </p>

          <p>
            My Bujjikonda, ee year lo nek unlimited success raavali, chaaala memories happy ga create chesukovali. Naaku telusu you are talented, beautiful, capable and honestly, you are much more special than you think. Naa bujji bangaram nuvvu 😘❤️
          </p>

          <p>
            And Ammu, naaku unna biggest wishes lo okati entante, manam inka chala memories create cheskovali. Nee chinna chinna achievements kooda celebrate cheyyali, silly silly conversations cheyyali, reason lekunda navvukovali, special days lo ninnu surprise cheyyali. Nuv nee dreams anni achieve chesthunte chudali. Inka enno birthdays kalisi celebrate cheskovali. After many years, mana old memories gurinchi matladukunnappudu, aa moments gurthochi manam iddaram malli alage navvukovali. I really wish manaki alanti thousands of beautiful memories undali 🤭🫠
          </p>

          <p>
            My little Chitti, life long nek nuv expect chesina happiness kanna inka ekkuva ivvali. Ninnu love chese, understand cheskune, respect chese manchi people — ante na lanti vallu eppudu nee chuttu undali 🤭 Nuv eppudu lonely ga feel avvakudadhu. Whatever happens, never forget that you deserve so much happiness, love and all the beautiful things in this world.
          </p>

          <p>
            Ammu, sometimes naaku anipisthundhi, I have so many things to tell you but maatalu saripovu. Nuv nak entha important oo, nee presence nak entha happiness isthundho nek telidu ma... nuv na pakkana unte nak ee prapancham thone samandham undadu. But one thing I can say is, life lo nuv nak dorakadam genuinely is my best blessing for this life. I never expected someone to become this special, but here you are, being one of the most precious parts of my life. ❤️
          </p>

          <div className="text-3xl sm:text-4xl md:text-5xl font-bday text-[#881337] my-4 text-center drop-shadow-sm">
            Happiest 22nd Birthday, My Ammuuuuu! ❤️🎂
          </div>

          <p>
            Nuv eppudu ilage smile chesthu undali my dear princess. Nee 22nd year nee life lo one of the happiest chapters avvali. Mundhu raaboye birthdays anni inthakanna beautiful ga undali. Nuvvu korukune prathi wish okkokatiga nijam avvali. And every single day, you should have at least one reason to smile... and I&apos;ll be that reason for you.
          </p>

          <p>
            And finally, naa Bangaram, okati eppudu gurthupettuko. Nuvvu naa life lo just another person kaadhu. You are the only one I genuinely care for, ur my treasure treasure and someone whose happiness matters a lot to me.
          </p>

          <div className="py-2 text-center">
            <span className="font-times font-bold text-xl sm:text-2xl md:text-[24px] text-[#6B1724] tracking-wide inline-block">
              My Bangarammmm, My Bujji Kanna, My Bujjikonda, My Chitti, My Little Princess, My World, ur MY EVERYTHING! 🥹❤️👑
            </span>
          </div>

          <div className="mt-8 pt-4 text-center border-t border-rose-200/50">
            <div className="font-heading font-bold text-xl sm:text-2xl md:text-[26px] text-[#881337] tracking-wide leading-relaxed inline-block">
              LOTS AND LOTS OF LOVE TO YOU, AMMUUUUU! ❤️🫂
            </div>
            <p className="mt-2 text-base sm:text-lg md:text-xl font-times text-[#4A1521] leading-relaxed">
              Eppudu happy ga undali, navvuthu undali, nee life lo unna beautiful moments anni full ga enjoy cheyyali. You deserve all the happiness in this world, bangarmmmmmmmmmmmmmmmmmmmmmmmmmm! ❤️
            </p>
          </div>
        </div>
      </motion.div>

      {onNext && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          onClick={onNext}
          className="mt-12 text-rose-900 hover:text-rose-700 transition-colors uppercase tracking-widest text-sm font-medium cursor-pointer"
        >
          Continue →
        </motion.button>
      )}

      {onRestart && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
          onClick={onRestart}
          className="mt-12 px-6 py-2.5 rounded-full border border-rose-300 text-rose-900 hover:bg-rose-50 transition-all uppercase tracking-widest text-xs font-medium cursor-pointer flex items-center gap-2 shadow-sm"
        >
          <span>↺</span> Start from beginning
        </motion.button>
      )}
    </motion.div>
  );
}
