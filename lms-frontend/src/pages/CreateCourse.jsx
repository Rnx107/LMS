import SideBar from "../components/SideBar";
import Input from "../components/Input";

export default function CreateCourse() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 1. Sidebar */}
      <SideBar role="teacher" />

      <div className="flex flex-col pl-20 pb-20 w-full">
        {/* 2. Page Heading */}
        <h1 className="text-3xl font-bold mb-8 text-gray-800">Create Course</h1>

        <div className="bg-white flex flex-col space-y-4 p-6 rounded-lg shadow ">
          <h2 className="text-xl font-semibold">New Course</h2>
          <div className="space-y-5">

          <Input placeholder="Course Title" />
          <Input placeholder="Course Code (e.g. CS301)" />

          <textarea
            className="border rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full resize-none"
            placeholder="Course Description"
            rows={4}
          />
          <button
            type="submit"
            className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-semibold transition shadow-md">
            Create Course
          </button>
          </div>
        </div>
      </div>
    </div>
  );
}
