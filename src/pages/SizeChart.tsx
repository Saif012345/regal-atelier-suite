import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { Video, Ruler, HelpCircle } from "lucide-react";

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

            {/* Video Tutorial */}
            <div className="mb-12 p-6 bg-champagne rounded-lg">
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <div className="flex-shrink-0 h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                  <Video className="h-8 w-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-display text-xl font-semibold mb-2">
                    How to Measure Yourself
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Watch our step-by-step video tutorial to learn how to take accurate 
                    measurements at home. Proper measurements ensure the perfect fit.
                  </p>
                  <Button variant="gold" size="sm">
                    <Video className="h-4 w-4 mr-2" />
                    Watch Tutorial
                  </Button>
                </div>
              </div>
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

            {/* CTA */}
            <div className="text-center p-8 bg-charcoal rounded-lg">
              <h3 className="font-display text-2xl font-semibold text-ivory mb-3">
                Need Help Finding Your Size?
              </h3>
              <p className="text-ivory/70 mb-6">
                Book a virtual consultation and our stylists will help you find the perfect fit.
              </p>
              <Button asChild variant="gold">
                <Link to="/booking">Book Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
