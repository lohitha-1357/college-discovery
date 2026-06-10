import { colleges } from "@/lib/data/colleges";
import { notFound } from "next/navigation";
import { Tabs } from "@/components/ui/Tabs";

export default function CollegeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const college = colleges.find((c) => c.id === params.id);
  if (!college) notFound();

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{college.name}</h1>
        <p className="text-gray-500 text-sm mt-1">
          {college.location} · {college.type}
        </p>
      </div>

      <Tabs tabs={["Overview", "Courses", "Placements", "Reviews"]}>
        {/* Overview */}
        <div>
          <p className="text-gray-700 leading-relaxed">{college.overview}</p>
        </div>

        {/* Courses */}
        <div className="space-y-3">
          {college.courses.map((course) => (
            <div
  key={course.name}
  className="flex justify-between border-b pb-3 text-sm"
>
  <span className="font-medium text-gray-900">{course.name}</span>
  <span className="text-gray-700">{course.duration}</span>
  <span className="text-gray-900">₹{(course.fees / 100000).toFixed(1)}L</span>
            
            </div>
          ))}
        </div>

        {/* Placements */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Avg Package", value: `₹${college.placements.avgPackage}L` },
            { label: "Highest Package", value: `₹${college.placements.highestPackage}L` },
            { label: "Placement Rate", value: `${college.placements.placementRate}%` },
          ].map((s) => (
            <div key={s.label} className="bg-gray-50 rounded-xl p-4 text-center">
              <p className="text-xl font-bold text-blue-600">{s.value}</p>
              <p className="text-xs text-gray-500 mt-1">{s.label}</p>
            </div>
          ))}
          <div className="col-span-full">
            <p className="text-sm font-medium mb-2">Top Recruiters</p>
            <div className="flex flex-wrap gap-2">
              {college.placements.topRecruiters.map((r) => (
                <span
                  key={r}
                  className="text-xs bg-blue-50 text-blue-700 px-3 py-1 rounded-full"
                >
                  {r}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="space-y-4">
          {college.reviews.map((r) => (
            <div key={r.id} className="border rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-sm text-gray-900">{r.author}</span>
                <span className="text-yellow-500 text-sm">
                  {"★".repeat(r.rating)}
                </span>
              </div>
              <p className="text-sm text-gray-600">{r.text}</p>
            </div>
          ))}
        </div>
      </Tabs>
    </main>
  );
}