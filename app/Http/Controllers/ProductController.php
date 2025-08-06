<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Product::query()
            ->when($request->search && trim($request->search) !== '', function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            })

            // ->when($request->type, function ($query, $type) {
            //     $query->whereHas('type', function ($q) use ($type) {
            //         $q->where('id', $type);
            //     });
            // })
            ->orderBy('created_at', 'desc');

        $products = $query->latest()->paginate($request->per_page ?? 10)
            ->withQueryString();



        return Inertia::render('products', [
            'products' => $products,
            // 'categories' => Category::all(),
            'filters' => $request->only(['search', 'category', 'perPage']),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
