import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Video, Ruler, HelpCircle, ArrowRightLeft, Play } from "lucide-react";
import { CalendlyBooking } from "@/components/CalendlyBooking";

const sizeChartInches = [
  { size: "XS", us: "0-2", bust: "31-32", waist: "23-24", hips: "33-34", hollow: "54-55" },
  { size: "S", us: "4-6", bust: "33-34", waist: "25-26", hips: "35-36", hollow: "55-56" },
  { size: "M", us: "8-10", bust: "35-36", waist: "27-28", hips: "37-38", hollow: "56-57" },
  { size: "L", us: "12-14", bust: "37-39", waist: "29-31", hips: "39-41", hollow: "57-58" },
  { size: "XL", us: "16-18", bust: "40-42", waist: "32-34", hips: "42-44", hollow: "58-59" },
  { size: "2XL", us: "20-22", bust: "43-45", waist: "35-37", hips: "45-47", hollow: "59-60" },
];

const sizeChartCm = [
  { size: "XS", us: "0-2", bust: "79-81", waist: "58-61", hips: "84-86", hollow: "137-140" },
  { size: "S", us: "4-6", bust: "84-86", waist: "64-66", hips: "89-91", hollow: "140-142" },
  { size: "M", us: "8-10", bust: "89-91", waist: "69-71", hips: "94-97", hollow: "142-145" },
  { size: "L", us: "12-14", bust: "94-99", waist: "74-79", hips: "99-104", hollow: "145-147" },
  { size: "XL", us: "16-18", bust: "102-107", waist: "81-86", hips: "107-112", hollow: "147-150" },
  { size: "2XL", us: "20-22", bust: "109-114", waist: "89-94", hips: "114-119", hollow: "150-152" },
];

const measurementGuide = [
  {
    name: "Bust",
    description: "Measure around the fullest part of your bust, keeping the tape level.",
  },
  {
    name: "Waist",
    description: "Measure around your natural waistline, the narrowest part of your torso.",
  },
  {
    name: "Hips",
    description: "Measure around the fullest part of your hips, about 8 inches below your waist.",
  },
  {
    name: "Hollow to Floor",
    description: "From the hollow of your neck (where a necklace sits) to the floor, barefoot.",
  },
  {
    name: "Shoulder Width",
    description: "From the edge of one shoulder to the other, across the back.",
  },
  {
    name: "Sleeve Length",
    description: "From shoulder point to wrist with arm slightly bent.",
  },
];

export default function SizeChart() {
  const [showVideo, setShowVideo] = useState(false);
  const [conversionMode, setConversionMode] = useState<"inToCm" | "cmToIn">("inToCm");
  const [inputValue, setInputValue] = useState("");

  const convertedValue = inputValue
    ? conversionMode === "inToCm"
      ? (parseFloat(inputValue) * 2.54).toFixed(1)
      : (parseFloat(inputValue) / 2.54).toFixed(1)
    : "";

  return (
    <Layout>
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
                {showVideo ? (
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                      title="How to Take Your Measurements"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                ) : (
                  <div 
                    className="aspect-video bg-gradient-to-br from-charcoal to-charcoal/80 flex flex-col items-center justify-center cursor-pointer group relative"
                    onClick={() => setShowVideo(true)}
                  >
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
                  </div>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                Replace the video URL with your actual measurement tutorial video
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
                  <Input
                    id="input-value"
                    type="number"
                    placeholder={conversionMode === "inToCm" ? "Enter inches..." : "Enter cm..."}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-card"
                  />
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  className="mt-6 sm:mt-0 flex-shrink-0"
                  onClick={() => {
                    setConversionMode(conversionMode === "inToCm" ? "cmToIn" : "inToCm");
                    setInputValue("");
                  }}
                >
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
                        {sizeChartInches.map((row, index) => (
                          <tr
                            key={row.size}
                            className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}
                          >
                            <td className="py-4 px-4 font-medium">{row.size}</td>
                            <td className="py-4 px-4">{row.us}</td>
                            <td className="py-4 px-4">{row.bust}"</td>
                            <td className="py-4 px-4">{row.waist}"</td>
                            <td className="py-4 px-4">{row.hips}"</td>
                            <td className="py-4 px-4">{row.hollow}"</td>
                          </tr>
                        ))}
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
                        {sizeChartCm.map((row, index) => (
                          <tr
                            key={row.size}
                            className={index % 2 === 0 ? "bg-card" : "bg-muted/30"}
                          >
                            <td className="py-4 px-4 font-medium">{row.size}</td>
                            <td className="py-4 px-4">{row.us}</td>
                            <td className="py-4 px-4">{row.bust} cm</td>
                            <td className="py-4 px-4">{row.waist} cm</td>
                            <td className="py-4 px-4">{row.hips} cm</td>
                            <td className="py-4 px-4">{row.hollow} cm</td>
                          </tr>
                        ))}
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
                {measurementGuide.map((item) => (
                  <div
                    key={item.name}
                    className="p-4 rounded-lg border border-border bg-card"
                  >
                    <h3 className="font-medium text-foreground mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
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
              <CalendlyBooking text="Book Size Consultation" />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
