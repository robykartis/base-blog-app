<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Ramsey\Uuid\Uuid;

class Category extends Model
{
    use HasFactory, SoftDeletes;
    protected $table = 'categories';
    protected $fillable = [
        'name',
        'slug',
        'user_id',
        'created_by',
        'updated_by'
    ];
    protected $guarded = [
        'id'
    ];
    // Specify the primary key
    protected $primaryKey = 'id';

    // Define the key type as UUID
    protected $keyType = 'string';

    // Disable incrementing for UUIDs
    public $incrementing = false;
    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->id = Uuid::uuid4()->toString();
        });
    }
    public function m_user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    public function m_product()
    {
        return $this->hasMany(Product::class, 'category_id', 'id');
    }
}
