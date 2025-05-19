
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Search,
  Plus,
  Filter,
  FileText,
  File,
  Folder,
  MoreVertical,
  Download,
  Share,
  Trash,
  Upload,
  Clock
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { mockClients } from "@/data/mockData";

// Mock document types and documents
const documentTypes = ["All", "Audit", "Tax", "GST", "Compliance", "Others"];

interface Document {
  id: string;
  name: string;
  type: string;
  size: string;
  client: string;
  lastModified: string;
  category: "audit" | "tax" | "gst" | "compliance" | "others";
}

const mockDocuments: Document[] = [
  {
    id: "doc1",
    name: "Hubli Educational Trust - Audit Report FY 2023-24.pdf",
    type: "PDF",
    size: "2.4 MB",
    client: "Hubli Educational Trust",
    lastModified: "2024-05-15",
    category: "audit"
  },
  {
    id: "doc2",
    name: "Rajesh Textile - GST Returns May 2024.xlsx",
    type: "XLSX",
    size: "1.2 MB",
    client: "Rajesh Textile Industries",
    lastModified: "2024-05-18",
    category: "gst"
  },
  {
    id: "doc3",
    name: "Sunil Mehta - ITR AY 2024-25.pdf",
    type: "PDF",
    size: "3.5 MB",
    client: "Sunil Mehta",
    lastModified: "2024-05-10",
    category: "tax"
  },
  {
    id: "doc4",
    name: "Hubli Health Services - Partnership Deed.docx",
    type: "DOCX",
    size: "1.8 MB",
    client: "Hubli Health Services",
    lastModified: "2024-05-05",
    category: "compliance"
  },
  {
    id: "doc5",
    name: "Karnataka Public School - FCRA Submission.pdf",
    type: "PDF",
    size: "4.2 MB",
    client: "Karnataka Public School",
    lastModified: "2024-05-20",
    category: "compliance"
  },
];

const DocumentsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = 
      doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.client.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === "All" || doc.category === selectedType.toLowerCase();
    
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Documents</h1>
          <p className="text-muted-foreground">Securely manage and store all your client documents.</p>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search documents..."
                className="w-full pl-9 pr-4 py-2 rounded-md border border-input bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={() => setViewMode("grid")} className={viewMode === "grid" ? "bg-muted" : ""}>
              <div className="grid grid-cols-2 gap-0.5">
                <div className="w-1.5 h-1.5 bg-current"></div>
                <div className="w-1.5 h-1.5 bg-current"></div>
                <div className="w-1.5 h-1.5 bg-current"></div>
                <div className="w-1.5 h-1.5 bg-current"></div>
              </div>
            </Button>
            <Button variant="outline" size="icon" onClick={() => setViewMode("list")} className={viewMode === "list" ? "bg-muted" : ""}>
              <div className="flex flex-col gap-0.5">
                <div className="w-4 h-1 bg-current"></div>
                <div className="w-4 h-1 bg-current"></div>
                <div className="w-4 h-1 bg-current"></div>
              </div>
            </Button>
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload
            </Button>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex overflow-x-auto gap-2 pb-2">
            {documentTypes.map(type => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type)}
              >
                {type}
              </Button>
            ))}
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <h2 className="text-lg font-medium">Recent Documents</h2>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                Last updated: {new Date().toLocaleDateString()}
              </div>
            </div>
            
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filteredDocuments.map(doc => (
                  <Card key={doc.id} className="overflow-hidden card-hover">
                    <div className="bg-muted p-4 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-crm-blue" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-sm truncate" title={doc.name}>{doc.name}</h3>
                      <div className="flex items-center text-xs text-muted-foreground mt-2">
                        <span>{doc.type} • {doc.size}</span>
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground mt-1">
                        <span>Client: {doc.client}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">
                          {new Date(doc.lastModified).toLocaleDateString()}
                        </span>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50 border-b">
                      <th className="py-3 px-4 text-left">Name</th>
                      <th className="py-3 px-4 text-left">Client</th>
                      <th className="py-3 px-4 text-left">Type</th>
                      <th className="py-3 px-4 text-left">Size</th>
                      <th className="py-3 px-4 text-left">Last Modified</th>
                      <th className="py-3 px-4 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDocuments.map(doc => (
                      <tr key={doc.id} className="border-b hover:bg-muted/20">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <FileText className="h-4 w-4 text-crm-blue" />
                            <span className="font-medium truncate max-w-[250px]" title={doc.name}>{doc.name}</span>
                          </div>
                        </td>
                        <td className="py-3 px-4">{doc.client}</td>
                        <td className="py-3 px-4">{doc.type}</td>
                        <td className="py-3 px-4">{doc.size}</td>
                        <td className="py-3 px-4">{new Date(doc.lastModified).toLocaleDateString()}</td>
                        <td className="py-3 px-4">
                          <div className="flex justify-center gap-2">
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Share className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            <h2 className="text-lg font-medium">Client Folders</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {mockClients.map(client => (
                <Card key={client.id} className="overflow-hidden card-hover">
                  <div className="p-4 flex items-center gap-3">
                    <Folder className="h-6 w-6 text-crm-blue" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm truncate" title={client.name}>
                        {client.name}
                      </h3>
                      <p className="text-xs text-muted-foreground capitalize">
                        {client.type}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DocumentsPage;
