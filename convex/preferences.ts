import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const create = mutation({
    args: {
      id: v.optional(v.id("preferences")),
      image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const userId = await getAuthUserId(ctx);

        if (!userId) {
          throw new Error("Unauthorized");
        }
  
        const preference =  await ctx.db
        .query("preferences")
        .withIndex("by_user_id", (q) => q.eq("userId", userId))
        .collect();

        if (preference.length > 0) {
          return ctx.db.patch(preference[0]._id, {
            backgroundImage: args.image,
          });
        } else {
          return ctx.db.insert("preferences", {
            userId,
            backgroundImage: args.image,
          });
        }
    },
  });

  export const get = query({
    args: {},
    handler: async (ctx) => {
      const userId = await getAuthUserId(ctx);
  
      if (!userId) {
        return [];
      }
  
      return await ctx.db
        .query("preferences")
        .withIndex("by_user_id", (q) => q.eq("userId", userId))
        .collect();
    },
  });