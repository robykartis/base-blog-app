<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Tags;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Throwable;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $product = Product::with(['m_user', 'm_category', 'm_tags'])->get();
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'No Data'
            ], 401);
        }
        return response()->json([
            'success'       => true,
            'data'          =>  $product
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:2|max:20',
            'body' => 'required|min:2',
            'category_id' => 'required',
            // 'image' => 'required|mimes:jpg,jpeg,png|max:2048',
        ], [
            'title.required' => 'Title is required',
            'title.min' => 'Title min 2 character',
            'title.max' => 'Title min 20 character',
            'category_id' => 'Category is required',
            'body.required' => 'Body is required',
            'body.min' => 'Body min 2 character',
            // 'image.mimes' => 'Image infailed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 401);
        }
        DB::beginTransaction();
        try {
            $product =  Product::create([
                'title' => $request->title,
                'slug' => Str::slug($request->title),
                'body' => $request->body,
                'category_id' => $request->category_id,
                'user_id' => Auth::user()->id,
                'created_by' => Auth::user()->id
            ]);
            $tag = Tags::create([
                'product_id' => $product->id,
                'tag' => $request->tag
            ]);
            DB::commit();
            return response()->json([
                'success'       => true,
                'message'       => 'Product success created!',
                'data'          => [
                    'product' => $product,
                    'tags' => $tag
                ]
            ], 200);
        } catch (Throwable $th) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $th
            ], 401);
            throw $th;
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = Product::with(['m_user', 'm_category', 'm_tags'])
            ->where('id', $id)
            ->first();
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'No Data'
            ], 401);
        }
        return response()->json([
            'success'       => true,
            'data'          => $product
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $product = Product::with(['m_user', 'm_category', 'm_tags'])
            ->where('id', $id)
            ->first();
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'No Data'
            ], 401);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required|min:2|max:20',
            'body' => 'required|min:2',
            'category_id' => 'required',
            // 'image' => 'required|mimes:jpg,jpeg,png|max:2048',
        ], [
            'title.required' => 'Title is required',
            'title.min' => 'Title min 2 character',
            'title.max' => 'Title min 20 character',
            'category_id' => 'Category is required',
            'body.required' => 'Body is required',
            'body.min' => 'Body min 2 character',
            // 'image.mimes' => 'Image infailed'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => $validator->errors()
            ], 401);
        }
        DB::beginTransaction();
        try {
            $product->update([
                'id' => $product->id,
                'title' => $request->title,
                'slug' => Str::slug($request->title),
                'body' => $request->body,
                'category_id' => $request->category_id,
                'user_id' => Auth::user()->id,
                'created_by' => Auth::user()->id
            ]);
            $tag = Tags::where('product_id', $product->id)->first();
            $tag->update([
                'id' => $tag->id,
                'product_id' => $product->id,
                'tag' => $request->tag
            ]);
            DB::commit();
            return response()->json([
                'success'       => true,
                'message'       => $product->title . ' Product success updated!'
            ], 200);
        } catch (Throwable $th) {
            DB::rollBack();
            return response()->json([
                'success' => false,
                'message' => $th
            ], 401);
            throw $th;
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = Product::find($id);
        if (!$product) {
            return response()->json([
                'success' => false,
                'message' => 'No Data'
            ], 401);
        }
        $product->delete();
        return response()->json([
            'success'       => true,
            'message'       => $product->title . ' Product success deleted!'
        ], 200);
    }
}
