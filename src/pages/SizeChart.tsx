import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Video, Ruler, HelpCircle, ArrowRightLeft, Play } from "lucide-react";
const sizeChartInches = [{
  size: "2",
  us: "2",
  bust: "32",
  waist: "24",
  hips: "34",
  hollow: "54-55"
}, {
  size: "4",
  us: "4",
  bust: "33",
  waist: "25",
  hips: "35",
  hollow: "55-56"
}, {
  size: "6",
  us: "6",
  bust: "34",
  waist: "26",
  hips: "36",
  hollow: "55-56"
}, {
  size: "8",
  us: "8",
  bust: "35",
  waist: "27",
  hips: "37",
  hollow: "56-57"
}, {
  size: "10",
  us: "10",
  bust: "36",
  waist: "28",
  hips: "38",
  hollow: "56-57"
}, {
  size: "12",
  us: "12",
  bust: "38",
  waist: "30",
  hips: "40",
  hollow: "57-58"
}, {
  size: "14",
  us: "14",
  bust: "40",
  waist: "32",
  hips: "42",
  hollow: "57-58"
}, {
  size: "16",
  us: "16",
  bust: "42",
  waist: "34",
  hips: "44",
  hollow: "58-59"
}, {
  size: "18",
  us: "18",
  bust: "44",
  waist: "36",
  hips: "46",
  hollow: "58-59"
}, {
  size: "20",
  us: "20",
  bust: "46",
  waist: "38",
  hips: "48",
  hollow: "59-60"
}, {
  size: "22",
  us: "22",
  bust: "48",
  waist: "40",
  hips: "50",
  hollow: "59-60"
}, {
  size: "24",
  us: "24",
  bust: "50",
  waist: "42",
  hips: "52",
  hollow: "60-61"
}];
const sizeChartCm = [{
  size: "2",
  us: "2",
  bust: "81",
  waist: "61",
  hips: "86",
  hollow: "137-140"
}, {
  size: "4",
  us: "4",
  bust: "84",
  waist: "64",
  hips: "89",
  hollow: "140-142"
}, {
  size: "6",
  us: "6",
  bust: "86",
  waist: "66",
  hips: "91",
  hollow: "140-142"
}, {
  size: "8",
  us: "8",
  bust: "89",
  waist: "69",
  hips: "94",
  hollow: "142-145"
}, {
  size: "10",
  us: "10",
  bust: "91",
  waist: "71",
  hips: "97",
  hollow: "142-145"
}, {
  size: "12",
  us: "12",
  bust: "97",
  waist: "76",
  hips: "102",
  hollow: "145-147"
}, {
  size: "14",
  us: "14",
  bust: "102",
  waist: "81",
  hips: "107",
  hollow: "145-147"
}, {
  size: "16",
  us: "16",
  bust: "107",
  waist: "86",
  hips: "112",
  hollow: "147-150"
}, {
  size: "18",
  us: "18",
  bust: "112",
  waist: "91",
  hips: "117",
  hollow: "147-150"
}, {
  size: "20",
  us: "20",
  bust: "117",
  waist: "97",
  hips: "122",
  hollow: "150-152"
}, {
  size: "22",
  us: "22",
  bust: "122",
  waist: "102",
  hips: "127",
  hollow: "150-152"
}, {
  size: "24",
  us: "24",
  bust: "127",
  waist: "107",
  hips: "132",
  hollow: "152-155"
}];
const measurementGuide = [{
  name: "Bust",
  description: "Measure around the fullest part of your bust, keeping the tape level."
}, {
  name: "Waist",
  description: "Measure around your natural waistline, the narrowest part of your torso."
}, {
  name: "Hips",
  description: "Measure around the fullest part of your hips, about 8 inches below your waist."
}, {
  name: "Hollow to Floor",
  description: "From the hollow of your neck (where a necklace sits) to the floor, barefoot."
}, {
  name: "Shoulder Width",
  description: "From the edge of one shoulder to the other, across the back."
}, {
  name: "Sleeve Length",
  description: "From shoulder point to wrist with arm slightly bent."
}];
export default function SizeChart() {
  const [showVideo, setShowVideo] = useState(false);
  const [conversionMode, setConversionMode] = useState<"inToCm" | "cmToIn">("inToCm");
  const [inputValue, setInputValue] = useState("");
  const convertedValue = inputValue ? conversionMode === "inToCm" ? (parseFloat(inputValue) * 2.54).toFixed(1) : (parseFloat(inputValue) / 2.54).toFixed(1) : "";
  return <Layout>
      {/* Hero */}
      <section className="bg-gradient-hero py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl font-semibold text-foreground sm:text-5xl mb-4">
            Size Guide
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Find your perfect fit with our comprehensive size charts and measurement guide.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Video Tutorial Section */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Video className="h-5 w-5 text-primary" />
                <h2 className="font-display text-2xl font-semibold">How to Measure Yourself</h2>
              </div>

              <div className="rounded-lg overflow-hidden border border-border bg-card">
                {showVideo ? <div className="aspect-video">
                    <iframe width="100%" height="100%" src="https://www.youtube.com/embed/kh3LWlsTPKM?si=tFKi1I3zL_vuKC6c&autoplay=1" title="How to Take Your Measurements" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen className="w-full h-full" />
                  </div> : <div className="aspect-video bg-gradient-to-br from-charcoal to-charcoal/80 flex flex-col items-center justify-center cursor-pointer group relative" onClick={() => setShowVideo(true)}>
                    <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="h-20 w-20 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                      <Play className="h-10 w-10 text-primary fill-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-ivory mb-2">
                      Measurement Tutorial Video
                    </h3>
                    <p className="text-ivory/70 text-sm max-w-md text-center px-4">
                      Learn how to take accurate measurements at home with our step-by-step guide
                    </p>
                  </div>}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Learn how to take accurate measurements at home with our step-by-step guide.
              </p>
            </div>

            {/* Unit Converter */}
            <div className="mb-12 p-6 bg-champagne rounded-lg">
              <div className="flex items-center gap-2 mb-4">
                <ArrowRightLeft className="h-5 w-5 text-primary" />
                <h3 className="font-display text-xl font-semibold">Unit Converter</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Quickly convert your measurements between inches and centimeters.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="flex-1 w-full">
                  <Label htmlFor="input-value" className="text-sm mb-1.5 block">
                    {conversionMode === "inToCm" ? "Inches" : "Centimeters"}
                  </Label>
                  <Input id="input-value" type="number" placeholder={conversionMode === "inToCm" ? "Enter inches..." : "Enter cm..."} value={inputValue} onChange={e => setInputValue(e.target.value)} className="bg-card" />
                </div>

                <Button variant="outline" size="icon" className="mt-6 sm:mt-0 flex-shrink-0" onClick={() => {
                setConversionMode(conversionMode === "inToCm" ? "cmToIn" : "inToCm");
                setInputValue("");
              }}>
                  <ArrowRightLeft className="h-4 w-4" />
                </Button>

                <div className="flex-1 w-full">
                  <Label className="text-sm mb-1.5 block">
                    {conversionMode === "inToCm" ? "Centimeters" : "Inches"}
                  </Label>
                  <div className="h-10 px-3 rounded-md border border-border bg-muted flex items-center">
                    <span className="text-foreground">
                      {convertedValue ? `${convertedValue} ${conversionMode === "inToCm" ? "cm" : "in"}` : "—"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Size Chart Tables */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <Ruler className="h-5 w-5 text-primary" />
                <h2 className="font-display text-2xl font-semibold">Size Charts</h2>
              </div>

              <Tabs defaultValue="inches" className="w-full">
                <TabsList className="w-full max-w-xs mb-6 bg-muted">
                  <TabsTrigger value="inches" className="flex-1">Inches</TabsTrigger>
                  <TabsTrigger value="cm" className="flex-1">Centimeters</TabsTrigger>
                </TabsList>

                <TabsContent value="inches">
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="py-4 px-4 text-left font-medium">Size</th>
                          <th className="py-4 px-4 text-left font-medium">US Size</th>
                          <th className="py-4 px-4 text-left font-medium">Bust</th>
                          <th className="py-4 px-4 text-left font-medium">Waist</th>
                          <th className="py-4 px-4 text-left font-medium">Hips</th>
                          <th className="py-4 px-4 text-left font-medium">Hollow to Floor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChartInches.map((row, index) => <tr key={row.size} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                            <td className="py-4 px-4 font-medium">{row.size}</td>
                            <td className="py-4 px-4">{row.us}</td>
                            <td className="py-4 px-4">{row.bust}"</td>
                            <td className="py-4 px-4">{row.waist}"</td>
                            <td className="py-4 px-4">{row.hips}"</td>
                            <td className="py-4 px-4">{row.hollow}"</td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>

                <TabsContent value="cm">
                  <div className="overflow-x-auto rounded-lg border border-border">
                    <table className="w-full text-sm">
                      <thead className="bg-muted">
                        <tr>
                          <th className="py-4 px-4 text-left font-medium">Size</th>
                          <th className="py-4 px-4 text-left font-medium">US Size</th>
                          <th className="py-4 px-4 text-left font-medium">Bust</th>
                          <th className="py-4 px-4 text-left font-medium">Waist</th>
                          <th className="py-4 px-4 text-left font-medium">Hips</th>
                          <th className="py-4 px-4 text-left font-medium">Hollow to Floor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {sizeChartCm.map((row, index) => <tr key={row.size} className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}>
                            <td className="py-4 px-4 font-medium">{row.size}</td>
                            <td className="py-4 px-4">{row.us}</td>
                            <td className="py-4 px-4">{row.bust} cm</td>
                            <td className="py-4 px-4">{row.waist} cm</td>
                            <td className="py-4 px-4">{row.hips} cm</td>
                            <td className="py-4 px-4">{row.hollow} cm</td>
                          </tr>)}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Measurement Guide */}
            <div className="mb-12">
              <div className="flex items-center gap-2 mb-6">
                <HelpCircle className="h-5 w-5 text-primary" />
                <h2 className="font-display text-2xl font-semibold">Measurement Guide</h2>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {measurementGuide.map(item => <div key={item.name} className="p-4 rounded-lg border border-border bg-card">
                    <h3 className="font-medium text-foreground mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>)}
              </div>
            </div>

            {/* CTA with Calendly */}
            <div className="text-center p-8 bg-charcoal rounded-lg">
              <h3 className="font-display text-2xl font-semibold text-ivory mb-3">
                Need Help Finding Your Size?
              </h3>
              <p className="text-ivory/70 mb-6">
                Book a virtual consultation and our stylists will help you find the perfect fit.
              </p>
              <Button variant="outline" className="border-ivory text-ivory hover:bg-ivory/10" asChild>
                <Link to="/booking" className="text-primary">Book Size Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>;
}