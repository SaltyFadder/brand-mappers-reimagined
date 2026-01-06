import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Plus, Trash2, Shield, UserCheck } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface AdminUser {
  id: string;
  user_id: string;
  created_at: string;
}

export const AdminUsersEditor = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);
  const [admins, setAdmins] = useState<AdminUser[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const fetchAdmins = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUserId(user?.id || null);

      const { data, error } = await supabase
        .from("user_roles")
        .select("id, user_id, created_at")
        .eq("role", "admin");

      if (error) throw error;

      setAdmins(data || []);
    } catch (err) {
      console.error("Error fetching admins:", err);
      toast({
        title: "Error",
        description: "Failed to load admin users.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const addAdmin = async () => {
    if (!newEmail.trim()) {
      toast({
        title: "Email required",
        description: "Please enter an email address.",
        variant: "destructive",
      });
      return;
    }

    setAdding(true);
    try {
      // Use the RPC function to get user ID by email
      const { data: userId, error: rpcError } = await supabase
        .rpc("get_user_by_email" as any, { email_input: newEmail.trim() });

      if (rpcError || !userId) {
        toast({
          title: "User not found",
          description: "This email is not registered. The user must sign up first.",
          variant: "destructive",
        });
        setAdding(false);
        return;
      }

      // Add admin role
      const { error } = await supabase
        .from("user_roles")
        .insert([{ user_id: userId as string, role: "admin" as const }]);

      if (error) {
        if (error.code === "23505") {
          toast({
            title: "Already an admin",
            description: "This user is already an admin.",
            variant: "destructive",
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "Admin added",
          description: `${newEmail} has been granted admin access.`,
        });
        setNewEmail("");
        fetchAdmins();
      }
    } catch (err) {
      console.error("Error adding admin:", err);
      toast({
        title: "Error",
        description: "Failed to add admin. Make sure the user has signed up first.",
        variant: "destructive",
      });
    } finally {
      setAdding(false);
    }
  };

  const removeAdmin = async (id: string, userId: string) => {
    if (currentUserId === userId) {
      toast({
        title: "Cannot remove yourself",
        description: "You cannot remove your own admin access.",
        variant: "destructive",
      });
      return;
    }

    try {
      const { error } = await supabase
        .from("user_roles")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Admin removed",
        description: "Admin access has been revoked.",
      });
      fetchAdmins();
    } catch (err) {
      console.error("Error removing admin:", err);
      toast({
        title: "Error",
        description: "Failed to remove admin.",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-2xl font-display font-bold text-foreground">
          Admin Users
        </h2>
        <p className="text-muted-foreground mt-1">
          Manage who has access to this admin dashboard
        </p>
      </div>

      {/* Add New Admin */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Add New Admin
          </CardTitle>
          <CardDescription>
            Grant admin access to another user. They must have already signed up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3">
            <div className="flex-1">
              <Label htmlFor="email" className="sr-only">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter user's email address"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addAdmin()}
              />
            </div>
            <Button onClick={addAdmin} disabled={adding}>
              {adding ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <UserCheck className="w-4 h-4 mr-2" />
                  Add Admin
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Admins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Current Admins ({admins.length})
          </CardTitle>
          <CardDescription>
            Users with admin access to this dashboard
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {admins.length === 0 ? (
              <p className="text-muted-foreground text-center py-8">
                No admins found.
              </p>
            ) : (
              admins.map((admin) => (
                <div
                  key={admin.id}
                  className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">
                        {admin.user_id === currentUserId ? (
                          <span className="flex items-center gap-2">
                            You <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">Current</span>
                          </span>
                        ) : (
                          `Admin User`
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground font-mono">
                        ID: {admin.user_id.slice(0, 8)}...
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Added: {new Date(admin.created_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  {admin.user_id !== currentUserId && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAdmin(admin.id, admin.user_id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Info Card */}
      <Card className="border-primary/30 bg-primary/5">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> To add a new admin,
            they must first create an account by signing up. Then enter their email
            address above to grant them admin access.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
